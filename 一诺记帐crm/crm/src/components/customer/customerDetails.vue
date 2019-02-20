<template>
  <div class="customerDetails">
    <div class="head">
      <p class="title" style="float:left;margin-top:5px;">{{this.originCustomerInfo.name}}</p>
      <div style="margin-top:5px;float:left">
        <div class="left-year" style="float:left;margin-top:5px;margin-left:20px;" v-if="yearDisplay">
          <span style="cursor: pointer;" :class="{disclick:prevY}" @click="prevStatus"><</span>
          <span>{{currentYear}}</span>
          <span style="cursor: pointer;" :class="{disclick:nextY}" @click="nextStatus">></span>
        </div>
        <div class="item-month" style="float:left;margin-left:15px;margin-top:5px;">
          <!--<div v-for="item in 12" v-bind:class="{'grey':isgrey,'orange':isorange,'green':isgreen}">{{item}}月</div>-->
          <div v-for="item in months">
            <div v-if="item.bill==null&&item.acc==null&&item.tax==null&&item.pay==null" class="light">{{item.period}}
            </div>
            <div v-else-if="new Date(currentYear+'/'+item.period).getTime()>new Date(currentY+'/'+currentM).getTime()"
                 class="grey">{{item.period}}
            </div>
            <div v-else-if="item.bill&&item.acc&&item.tax&&item.pay" class="green"
                 :class="{red:countAtive==item.period && isActive}">{{item.period}}
            </div>
            <div v-else class="orange" :class="{red:countAtive==item.period && isActive}">{{item.period}}</div>
          </div>
        </div>
      </div>
      <div class="item" style="float:right;margin-top:5px;">


        <div class="left-item" v-if="false">
          <!--<span style="font-weight:bold; font-size:18px;margin-right:10px; color:grey;">{{this.originCustomerInfo.createdAt}}</span>-->
          <el-date-picker
            v-model="selectMonth"
            type="month"
            format="yyyy 年 MM 月"
            style="width: 135px"
            @change="seleMonth"
            placeholder="选择月"
            :picker-options="pickerOptions0">
          </el-date-picker>
          <el-button v-if="this.billInfo.process.pay" class="status-detail">已收款
          </el-button>
          <el-button v-else>未收款</el-button>
          <el-dropdown @command="handleTicket">
            <el-button :disabled="!legPermission" v-if="this.billInfo.process.bill" class="status-detail">已取票
            </el-button>
            <el-button :disabled="!legPermission" class="unfinish" v-else>未取票</el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="getTicket">已取</el-dropdown-item>
              <el-dropdown-item command="notTicket">未取</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>

          <el-button :disabled="!accAndAdminPermission" @click="startAccount" v-if="this.billInfo.process.acc"
                     class="status-detail">已记账
          </el-button>
          <el-button :disabled="!accAndAdminPermission" class="unfinish" @click="startAccount" v-else>未记账</el-button>

          <el-dropdown @command="handleTax">
            <el-button v-if="this.billInfo.process.tax" class="status-detail">已报税</el-button>
            <el-button class="unfinish" v-else>未报税</el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="tax">已报</el-dropdown-item>
              <el-dropdown-item command="notTax">未报</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>


        <div style="clear:both;float:right">
          <span style="margin-right:15px;">专员：<span v-if="this.tasksInfo.tasks.biz">{{this.tasksInfo.tasks.biz.realName}}</span><span
            v-else>未分配</span></span>
          <span style="margin-right:15px;">记账：<span v-if="this.tasksInfo.tasks.acc">{{this.tasksInfo.tasks.acc.realName}}</span><span
            v-else>未分配</span></span>
          <span>外勤：<span v-if="this.tasksInfo.tasks.leg">{{this.tasksInfo.tasks.leg.realName}}</span><span
            v-else>未分配</span></span>
          <el-button style="margin:0 10px 0 20px;width:77px;padding:10px;" :disabled="!managePermission"
                     @click="taskAllocation(true)">任务分配
          </el-button>
          <el-dropdown trigger="click" @command="handleMore">
            <el-button :disabled="!managePermission" style="width:75px;padding:10px;">
              更多<i class="el-icon-more el-icon--right"></i>
            </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="delete">删除客户</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
    <div class="content">
      <template>
        <!--选项卡-->
        <el-tabs style="width:100%;" v-model="activeName2" type="card" @tab-click="handleTabClick">
          <!--取票选项卡-->
          <el-tab-pane name="first" v-if="billDisplay">
            <span slot="label"> 取票<span><img style="width:20px;margin-top:10px;margin-left:10px;float:right;"
                                             v-bind:src="billImg" alt=""></span></span>
            <div style="background:#F2F2F2;width:100%;min-height:500px;margin-top:20px;padding:50px 80px;">
              <div style="display:inline-block;width:100%;">
                <div class="left-year" style="float:left;margin-top:10px;">
                  <span style="cursor: pointer;" :class="{disclick:prevY}" @click="prevStatus"><</span>
                  <span>{{currentYear}}</span>
                  <span style="cursor: pointer;" :class="{disclick:nextY}" @click="nextStatus">></span>
                </div>
                <div class="item-c-month" style="float:left;margin-left:50px;">
                  <div v-for="item in months">
                    <div v-if="item.bill==null" class="light">{{item.period}}月</div>
                    <div
                      v-else-if="new Date(currentYear+'/'+item.period).getTime()>new Date(currentY+'/'+currentM).getTime()"
                      class="grey">{{item.period}}月
                    </div>
                    <a v-else-if="item.bill" style="cursor: pointer;" class="green" @click="selectBill(item.period)"
                       :class="{red:active==item.period}">{{item.period}}月
                    </a>
                    <a v-else style="cursor: pointer;" class="orange" @click="selectBill(item.period)"
                       :class="{red:active==item.period}">
                      {{item.period}}月
                    </a>
                  </div>
                </div>
                <div class="c-bill">
                  <div class="c-bill-done" v-if="billShow">
                    <h3 style="margin:40px 0 0 80px;">已取票</h3>
                    <div style="margin:25px 0 0 80px;">
                      <span><img src="../../img/complete.png" style="width:50px;height:50px;float:left" alt=""></span>
                      <span style="margin-top:15px;float:left;margin-left:20px;font-weight:bold;font-size:18px;">
                        <!--2017年7月20号 张三-->
                      </span>
                      <el-button style="float:right;margin-right:80px;background:orange;color:#fff;"
                                 @click="billBtn(0)">重置
                      </el-button>
                    </div>
                  </div>
                  <div class="c-bill-done" v-if="billNotShow">
                    <h3 style="margin:40px 0 0 80px;">未取票</h3>
                    <div style="margin:25px 0 0 80px;">
                      <span><img src="../../img/notcomplete.png" style="width:50px;height:50px;float:left"
                                 alt=""></span>
                      <span style="margin-top:15px;float:left;margin-left:20px;font-weight:bold;font-size:18px;">
                        <!--外勤：张三-->
                      </span>
                      <el-button style="float:right;margin-right:80px;background:limegreen;color:#fff;"
                                 @click="billBtn(1)">已取
                      </el-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <!--记账选项卡-->
          <el-tab-pane name="second" v-if="accDisplay">
            <span slot="label"> 记账<span><img style="width:20px;margin-top:10px;margin-left:10px;float:right;"
                                             v-bind:src="accImg" alt=""></span></span>
            <div style="background:#F2F2F2;width:100%;height:500px;margin-top:20px;padding:20px 80px;">
              <div style="display:inline-block;width:100%;">
                <div class="c-bill">
                  <div class="c-bill-done">
                    <!--<div style="margin:40px 0 0 40px;font-size:18px;">本月已结账/未记账</div>-->
                    <div v-if="accShow">
                      <h3 style="margin:40px 0 0 80px;">已结账</h3>
                      <div style="margin:25px 0 0 80px;">
                        <span><img src="../../img/complete.png" style="width:50px;height:50px;float:left" alt=""></span>
                      </div>
                    </div>
                    <div v-if="accNotShow">
                      <h3 style="margin:40px 0 0 80px;">未结账</h3>
                      <div style="margin:25px 0 0 80px;">
                        <span><img src="../../img/notcomplete.png" style="width:50px;height:50px;float:left"
                                   alt=""></span>
                      </div>
                    </div>
                    <div style="margin:25px 0 0 40px;">
                      <span style="margin-top:5px;margin-left:35px;float:left;font-size:18px;">
                        上次记账日期：<span>{{accDate}}</span>
                      </span>
                      <el-button style="float:right;margin-right:80px;background:limegreen;color:#fff;"
                                 @click="startAccount" v-if="accAndAdminPermission">进入账套
                      </el-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <!--报税选项卡-->
          <el-tab-pane name="third" v-if="taxDisplay">
            <span slot="label"> 报税<span><img style="width:20px;margin-top:10px;margin-left:10px;float:right;"
                                             v-bind:src="taxImg" alt=""></span></span>
            <div style="background:#F2F2F2;width:100%;min-height:500px;margin-top:20px;padding:50px 80px;">
              <div style="display:inline-block;width:100%;">
                <div class="left-year" style="float:left;margin-top:10px;">
                  <span style="cursor: pointer;" :class="{disclick:prevY}" @click="prevStatus"><</span>
                  <span>{{currentYear}}</span>
                  <span style="cursor: pointer;" :class="{disclick:nextY}" @click="nextStatus">></span>
                </div>
                <div class="item-c-month" style="float:left;margin-left:50px;">
                  <div v-for="item in months">
                    <div v-if="item.tax==null" class="light">{{item.period}}月</div>
                    <div
                      v-else-if="new Date(currentYear+'/'+item.period).getTime()>new Date(currentY+'/'+currentM).getTime()"
                      class="grey">{{item.period}}月
                    </div>
                    <a v-else-if="item.tax" style="cursor: pointer;" class="green" @click="selectTax(item.period)"
                       :class="{red:activeTax==item.period}">{{item.period}}月
                    </a>
                    <a v-else class="orange" style="cursor: pointer;" @click="selectTax(item.period)"
                       :class="{red:activeTax==item.period}">
                      {{item.period}}月
                    </a>
                  </div>
                </div>
                <div class="c-bill">
                  <div class="c-bill-done" v-show="taxShow">
                    <h3 style="margin:40px 0 0 80px;">已报税</h3>
                    <div style="margin:25px 0 0 80px;">
                      <span><img src="../../img/complete.png" style="width:50px;height:50px;float:left" alt=""></span>
                      <span style="margin-top:15px;float:left;margin-left:20px;font-weight:bold;font-size:18px;">
                      <!--  2017年7月20号 张三-->
                      </span>
                      <el-button style="float:right;margin-right:80px;background:#20a0ff;color:#fff;"
                                 @click="taxSave" v-if="accAndAdminPermission">保存
                      </el-button>
                    </div>
                  </div>
                  <div class="c-bill-done" v-show="taxNotShow">
                    <h3 style="margin:40px 0 0 80px;">未报税</h3>
                    <div style="margin:25px 0 100px 80px;">
                      <span><img src="../../img/notcomplete.png" style="width:50px;height:50px;float:left"
                                 alt=""></span>
                      <span style="margin-top:15px;float:left;margin-left:20px;font-weight:bold;font-size:18px;">
                        <!--外勤：张三-->
                      </span>
                      <el-button style="float:right;margin-right:80px;background:#20a0ff;color:#fff;"
                                 @click="taxSave" v-if="accAndAdminPermission">保存
                      </el-button>
                    </div>
                  </div>
                  <!--报税表格-->
                  <div class="tax-list" v-show="listShow">
                    <div class="tab-tax">
                      <p class="isTax">是否已报</p>
                      <el-table
                        ref="multipleTable"
                        :data="taxData"
                        border
                        tooltip-effect="dark"
                        style="width:90%;margin-left:5%;margin-bottom:40px;"
                        @selection-change="handleSelectionChange">
                        <el-table-column
                          prop="id"
                          label="name"
                          width=""
                          v-if="false">
                        </el-table-column>
                        <el-table-column
                          align="center"
                          label="税种"
                          width="">
                          <template scope="scope">
                            <el-input v-model="scope.row.name"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column
                          align="center"
                          label="税额"
                          width="">
                          <template scope="scope">
                            <el-input v-model="scope.row.money"></el-input>
                          </template>
                        </el-table-column>
                        <el-table-column
                          type="selection"
                          align="right"
                          width="">
                        </el-table-column>
                        <el-table-column
                          align="center"
                          width="120">
                          <template scope="scope">
                            <el-button type="text" @click="taxDelete(scope.$index, scope.row)">删除</el-button>
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                    <div class="addbtn">
                      <el-button size="small" style="background:limegreen;width:60px;color:#fff;margin-bottom:30px;"
                                 @click="addTax">新增
                      </el-button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <!--合同管理选项卡-->
          <el-tab-pane name="fourth">
            <span slot="label"> 合同管理<span v-if="payDisplay"><img
              style="width:20px;margin-top:10px;margin-left:10px;float:right;"
              v-bind:src="payImg" alt=""></span></span>
            <div style="overflow: hidden;position:relative">
              <div style="float: left;">
                <el-button size="small" @click="openAddContract(true)" v-if="bizAndAdminPermission" type="primary"
                           icon="plus">新增合同
                </el-button>
              </div>
              <div style="position:absolute;right:0;top:0;z-index:20;">
                <el-button size="small" @click="openPay(true)" v-if="bizAndAdminPermission&&receiveDisplay"
                           type="primary" icon="plus">
                  收款
                </el-button>
              </div>
            </div>
            <!--内容部分-->
            <div>
              <div class="contractLeft" ref="dd" v-if="isContract">
                <div class="box-card" v-for="(item,key) in contractInfo">
                  <div v-if="item.state==1" @click="handlerContractDet(key,item.id,item.code)"
                       style="position:relative;">
                    <el-card>
                      <div slot="header" style="overflow: hidden;">
                        <span class="fl">编号：{{item.code}}</span>
                        <el-dropdown trigger="click" @command="handlerContract" class="fr">
                       <span>
                      <i class="el-icon-more el-icon--right"></i>
                       </span>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item :command="{type:'delete',id:item.id,index:key}">终止</el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                      </div>
                      <p class="contractLineH" style="overflow: hidden;">
                        <span class="fl">{{item.price}}元/月</span>
                        <span class="fr">{{item.pay}}</span>
                      </p>
                      <p class="contractLineH" style="color: #666">{{item.startDate}}<span
                        style="margin: 0 6px">-</span>{{item.endDate}}
                      </p>

                    </el-card>
                  </div>
                  <div v-else @click="handlerContractDet(key,item.id,item.code)" style="position:relative;">
                    <div class="mask"></div>
                    <el-card>
                      <div slot="header" style="overflow: hidden;">
                        <span class="fl">编号：{{item.code}}</span>
                        <el-dropdown trigger="click" @command="handlerContract" class="fr">
                       <span>
                      <i class="el-icon-more el-icon--right"></i>
                       </span>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item :command="{type:'delete',id:item.id,index:key}">终止</el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>
                      </div>
                      <p class="contractLineH" style="overflow: hidden;">
                        <span class="fl">{{item.price}}元/月</span>
                        <span class="fr">{{item.pay}}</span>
                      </p>
                      <p class="contractLineH" style="color: #666">{{item.startDate}}<span
                        style="margin: 0 6px">-</span>{{item.endDate}}
                      </p>

                    </el-card>
                  </div>
                </div>
              </div>
              <div style="float:right;width:65%;" v-if="contractDisplay">
                <!--右侧合同对应收款信息表格-->
                <div style="padding:0 0 0 20px;position: relative;">
                  <h3 style="margin-bottom:20px;color:grey" v-bind:class="{'top':bizAndAdminPermission}">合同编号：{{curContractCode}}</h3>
                  <h3 style="margin-bottom:10px;">合同执行状态</h3>
                  <div class="table" style="margin-bottom:50px;">
                    <el-table align="center"
                              :data="contractPayList"
                              style="width: 100%"
                              :row-class-name="tableRowClassName">
                      <el-table-column
                        align="center"
                        prop="date"
                        label="收款日期"
                        min-width="">
                      </el-table-column>
                      <el-table-column
                        align="center"
                        prop="money"
                        label="应收金额"
                        min-width="">
                      </el-table-column>
                      <el-table-column
                        align="center"
                        prop="paid"
                        label="实收金额"
                        min-width="">
                      </el-table-column>
                      <el-table-column
                        align="center"
                        prop="should"
                        label="欠款"
                        min-width="">
                      </el-table-column>
                    </el-table>
                  </div>
                  <!--分页-->
                  <!--<div class="page1">-->
                  <!--<el-pagination style="float: right;"-->
                  <!--@current-change="handleContractPageChange"-->
                  <!--layout="total, prev, pager, next"-->
                  <!--:page-size="10"-->
                  <!--:total="100">-->
                  <!--</el-pagination>-->
                  <!--</div>-->
                </div>
                <!--右侧收款记录信息表格-->
                <div style="overflow: hidden;padding:0 0 0 20px;position: relative;">
                  <h3 style="margin-bottom:10px;">收款记录</h3>
                  <div class="table" style="margin-bottom: 100px;">
                    <el-table align="center"
                              :data="contractPayHistory"
                              style="width: 100%">
                      <el-table-column
                        prop="time"
                        align="center"
                        label="收款日期"
                        min-width="">
                      </el-table-column>
                      <el-table-column
                        align="center"
                        prop="money"
                        label="实收金额"
                        min-width="">
                      </el-table-column>
                      <el-table-column
                        align="center"
                        prop="discount"
                        label="优惠金额"
                        min-width="">
                      </el-table-column>
                      <el-table-column
                        align="center"
                        prop="userName"
                        label="操作人"
                        min-width="">
                      </el-table-column>
                    </el-table>
                  </div>
                  <!--分页-->
                  <!--<div class="page1">-->
                  <!--<el-pagination style="float: right;"-->
                  <!--@current-change="handleContractPageChange"-->
                  <!--layout="total, prev, pager, next"-->
                  <!--:page-size="10"-->
                  <!--:total="100">-->
                  <!--</el-pagination>-->
                  <!--</div>-->
                </div>
              </div>
            </div>
          </el-tab-pane>
          <!--联系人tab选项卡-->
          <el-tab-pane label="联系人" name="fifth">
            <div style="margin-bottom: 20px;margin-top: 5px;">
              <el-button size="small" @click="addContact(true)" type="primary" icon="plus">新增</el-button>
            </div>
            <!--联系人信息表格-->
            <div class="table">
              <el-table align="center"
                        :data="contactData"
                        style="width: 100%">
                <el-table-column
                  align="center"
                  prop="name"
                  label="姓名"
                  width="">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="phone"
                  label="手机号码"
                  width="">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="title"
                  label="职位"
                  width="">
                </el-table-column>
                <el-table-column
                  align="center"
                  prop="remark"
                  label="备注"
                  min-width="">
                </el-table-column>
                <el-table-column
                  align="center"
                  label="操作"
                  width=""
                >
                  <template scope="scope">
                    <el-button
                      style="width:40px;"
                      type="text"
                      @click="handleEdit(scope.$index, scope.row)">修改
                    </el-button>
                    <el-button
                      type="text"
                      style="width:40px;"
                      @click="handleDelete(scope.$index, scope.row)">删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </div>

          </el-tab-pane>
          <!--服务日志选项卡-->
          <el-tab-pane label="服务日志" name="sixth">
            <div style="margin-bottom: 20px;margin-top: 5px; overflow: hidden;">
              <div style="float: left;">
                <el-button size="" @click="addLog(true)" type="primary" icon="plus" size="small">新增</el-button>&nbsp;&nbsp;
                <el-radio-group size="small" v-model="radio3" @change="selectTask">
                  <el-radio-button label="全部"></el-radio-button>
                  <el-radio-button label="我的"></el-radio-button>
                </el-radio-group>
              </div>
              <div style="float: right;">
                <!--搜索框-->
                <el-input
                  style="height:40px;"
                  icon="search"
                  v-model="input2"
                  :on-icon-click="handleSearch"
                  @keyup.enter.native="handleSearch">
                </el-input>
              </div>
            </div>
            <div class="serviceTask">
              <div v-for="item in this.logList"
                   style="overflow: hidden;box-sizing:border-box;width: 100%;padding: 15px 30px;border-top: 1px solid #ccc;border-left: 1px solid #ccc;border-right: 1px solid #ccc;">
                <div style="float:left;width:10%;font-size:18px;font-weight:bold;"><p>{{item.userName}}</p></div>
                <div style="float:left;width:90%;border-bottom:none;line-height:22px;"><p style="min-height:50px;">
                  {{item.content}}</p>
                  <p style="margin-top: 10px;margin-bottom:-5px;">{{item.time}}</p></div>
              </div>
            </div>
            <!--分页-->
            <div class="page-log">
              <el-pagination style="float: right;"
                             @current-change="handleSerPageChange"
                             layout="total, prev, pager, next"
                             :page-size="10"
                             :total="this.length">
              </el-pagination>
            </div>
          </el-tab-pane>
          <!--公司详情选项卡-->
          <el-tab-pane label="公司详情" name="seventh">
            <div class="option"><h5 style="padding-bottom: 34px;">基本信息</h5>
              <el-button style="margin-top: -34px;
                " @click="modifyInfo(true)" class="op-right" type="text">修改
              </el-button>
            </div>
            <!--基本信息-->
            <div class="basicInfo">
              <table bgcolor="#ccc" cellspacing="1px">
                <tr bgcolor="#fff">
                  <td align="center" width="210px">公司名称</td>
                  <td width="370px">{{this.originCustomerInfo.name}}</td>
                  <td align="center" width="210px">联系人</td>
                  <td width="520px">{{this.originCustomerInfo.boss}}</td>
                </tr>
                <tr bgcolor="#fff">
                  <td align="center">联系电话</td>
                  <td>{{this.originCustomerInfo.phone}}</td>
                  <td align="center">所属行业</td>
                  <td>{{this.originCustomerInfo.industry}}</td>
                </tr>
              </table>
            </div>
            <!--业务信息-->
            <div class="option" style="margin-bottom:30px;"><h5>业务信息</h5></div>
            <div class="basicInfo">
              <table bgcolor="#ccc" cellspacing="1px">
                <tr bgcolor="#fff">
                  <td align="center" width="210px">详细地址</td>
                  <td width="370px">{{this.originCustomerInfo.area}}</td>
                  <td align="center" width="210px">业务类型</td>
                  <td width="520px">{{this.originCustomerInfo.op_biz}}</td>
                </tr>
                <tr bgcolor="#fff">
                  <td align="center">报税类别</td>
                  <td>{{this.originCustomerInfo.op_tax}}</td>
                  <td align="center">取票方式</td>
                  <td>{{this.originCustomerInfo.op_bill}}</td>
                </tr>
              </table>
            </div>
            <!--工商信息-->
            <div class="option"><h5 style="padding-bottom: 34px;">工商信息</h5>
              <el-button style="margin-top: -34px" @click="modifyGsInfo(true)" class="op-right" type="text">
                修改
              </el-button>
            </div>
            <div class="basicInfo">
              <table bgcolor="#ccc" cellspacing="1px">
                <tr bgcolor="#fff">
                  <td align="center" width="210px">工商注册号</td>
                  <td width="370px">{{this.originCustomerInfo.gsh_zhucehao}}</td>
                  <td align="center" width="210px">成立日期</td>
                  <td width="520px">{{this.originCustomerInfo.gsh_chengliriqi}}</td>
                </tr>
                <tr bgcolor="#fff">
                  <td align="center">注册类型</td>
                  <td>{{this.originCustomerInfo.gsh_zhuceleixing}}</td>
                  <td align="center">法定代表人</td>
                  <td>{{this.originCustomerInfo.gsh_faren}}</td>
                </tr>
                <tr bgcolor="#fff">
                  <td align="center">注册资本</td>
                  <td>{{this.originCustomerInfo.gsh_zhuceziben}}</td>
                  <td align="center">身份证号码</td>
                  <td>{{this.originCustomerInfo.gsh_shenfenzheng}}</td>
                </tr>
                <tr bgcolor="#fff">
                  <td align="center">经营范围</td>
                  <td>{{this.originCustomerInfo.gsh_jingyingfanwei}}</td>
                  <td align="center">登记机关</td>
                  <td>{{this.originCustomerInfo.gsh_dengjijiguan}}</td>
                </tr>
                <tr bgcolor="#fff">
                  <td align="center">营业期限</td>
                  <td>{{this.originCustomerInfo.gsh_yingyeqixian}}</td>
                  <td align="center">工商所</td>
                  <td>{{this.originCustomerInfo.gsh_gongshangsuo}}</td>
                </tr>
                <tr bgcolor="#fff">
                  <td align="center">行业类别</td>
                  <td>{{this.originCustomerInfo.gsh_hangyeleibie}}</td>
                  <td align="center">工商局公示密码</td>
                  <td>{{this.originCustomerInfo.gsh_gongshimima}}</td>
                </tr>
                <tr bgcolor="#fff">
                  <td align="center">注册地址</td>
                  <td>{{this.originCustomerInfo.gsh_zhucedizhi}}</td>
                  <td align="center">组织机构代码证</td>
                  <td>{{this.originCustomerInfo.gsh_jigoudaima}}</td>
                </tr>
                <tr bgcolor="#fff">
                  <td align="center">有效期限</td>
                  <td>{{this.originCustomerInfo.gsh_jigoudaimayouxiaoqi}}</td>
                  <td align="center"></td>
                  <td></td>
                </tr>
              </table>
            </div>
            <!--税务信息-->
            <div style="text-align: center;">
              <el-button class="showMoreOrLess" @click="showMore" v-if="!showOtherInfo">
                更多<i class="el-icon-more el-icon--right"></i>
              </el-button>
            </div>
            <div v-if="showOtherInfo">
              <div class="option"><h5>税务信息</h5>
                <el-button @click="modifySwInfo(true)" class="op-right" type="text">修改</el-button>
              </div>
              <div class="basicInfo">
                <table bgcolor="#ccc" cellspacing="1px">
                  <tr bgcolor="#fff">
                    <td align="center" width="210px">税务登记证号码</td>
                    <td width="370px">{{this.originCustomerInfo.shw_dengjizheng}}</td>
                    <td align="center" width="210px">所得税管辖</td>
                    <td width="520px">{{this.originCustomerInfo.shw_suodeshuiguanxia}}</td>
                  </tr>
                  <tr bgcolor="#fff">
                    <td align="center">计算机代码</td>
                    <td>{{this.originCustomerInfo.shw_jisuanjidaima}}</td>
                    <td align="center">国税下载密码</td>
                    <td>{{this.originCustomerInfo.shw_guoshuixiazai_mima}}</td>
                  </tr>
                  <tr bgcolor="#fff">
                    <td align="center">综合申报密码</td>
                    <td>{{this.originCustomerInfo.shw_zongheshenbao_mima}}</td>
                    <td align="center">个税申报密码</td>
                    <td>{{this.originCustomerInfo.shw_geshuishenbao_mima}}</td>
                  </tr>
                </table>
              </div>
              <!--专员信息-->
              <div class="option"><h5>专员信息</h5>
                <el-button @click="modifyZgyInfo(true)" class="op-right" type="text">修改</el-button>
              </div>
              <div class="basicInfo">
                <table bgcolor="#ccc" cellspacing="1px">
                  <tr bgcolor="#fff">
                    <td align="center" width="210px">管辖所</td>
                    <td width="370px">{{this.originCustomerInfo.zhy_gs_guanxiasuo}}</td>
                    <td align="center" width="210px">所在地</td>
                    <td width="520px">{{this.originCustomerInfo.zhy_gs_suozaidi}}</td>
                  </tr>
                  <tr bgcolor="#fff">
                    <td align="center">专管员</td>
                    <td>{{this.originCustomerInfo.zhy_gs_zhuanguanyuan}}</td>
                    <td align="center">电话</td>
                    <td>{{this.originCustomerInfo.zhy_gs_phone}}</td>
                  </tr>
                </table>
              </div>
              <!--银行信息-->
              <!--<div class="option" style="margin-top:100px;"><h5>银行信息</h5><el-button @click="modifyInfo" class="op-right" type="text">添加</el-button></div>-->
              <!--<div class="basicInfo nopad">-->
              <!--<table bgcolor="#ccc" cellspacing="1px">-->
              <!--<tr bgcolor="#fff">-->
              <!--<th>类型</th>-->
              <!--<th>银行</th>-->
              <!--<th>账号</th>-->
              <!--<th></th>-->
              <!--</tr>-->
              <!--<tr bgcolor="#fff">-->
              <!--<td align="center" width="220px">开户行</td>-->
              <!--<td width="430px">{{this.originCustomerInfo.zhy_gs_zhuanguanyuan}}</td>-->
              <!--<td align="center" width="480px">{{this.originCustomerInfo.zhy_gs_zhuanguanyuan}}</td>-->
              <!--<td width="220px" align="center"><el-button @click="" class="op-right" type="text">删除</el-button></td>-->
              <!--</tr>-->
              <!--<tr bgcolor="#fff">-->
              <!--<td align="center">普通银行</td>-->
              <!--<td>{{this.originCustomerInfo.zhy_gs_zhuanguanyuan}}</td>-->
              <!--<td align="center">{{this.originCustomerInfo.zhy_gs_zhuanguanyuan}}</td>-->
              <!--<td align="center"><el-button @click="" class="op-right" type="text">删除</el-button></td>-->
              <!--</tr>-->
              <!--</table>-->
              <!--</div>-->
              <!--股东信息-->
              <!--<div class="option"><h5>股东信息</h5><el-button @click="modifyInfo" class="op-right" type="text">添加</el-button></div>-->
              <!--<div class="basicInfo nopad">-->
              <!--<table bgcolor="#ccc" cellspacing="1px">-->
              <!--<tr bgcolor="#fff">-->
              <!--<th>姓名</th>-->
              <!--<th>身份证号码</th>-->
              <!--<th>持股比例（%）</th>-->
              <!--<th></th>-->
              <!--</tr>-->
              <!--<tr bgcolor="#fff">-->
              <!--<td align="center" width="220px">{{this.originCustomerInfo.zhy_gs_zhuanguanyuan}}</td>-->
              <!--<td width="430px">{{this.originCustomerInfo.zhy_gs_zhuanguanyuan}}</td>-->
              <!--<td align="center" width="480px">{{this.originCustomerInfo.zhy_gs_zhuanguanyuan}}</td>-->
              <!--<td width="220px" align="center"><el-button @click="" class="op-right" type="text">删除</el-button></td>-->
              <!--</tr>-->
              <!--</table>-->
              <!--</div>-->
            </div>
            <div style="text-align: center;">
              <el-button class="showMoreOrLess" @click="showLess" v-if="showOtherInfo">
                <i class="el-icon-arrow-up"></i>
              </el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
      </template>
    </div>
    <!--新增联系人模态框-->
    <div v-show="detailShow" class="detail">
      <div class="detail-wr">
        <h2 style="border-bottom: 1px solid #ccc;margin-bottom: 15px;padding-bottom: 10px">{{addOrEdit}}联系人<i
          @click="handlerAddTask('formContact')" style="float: right;margin-right: 20px;cursor: pointer;"
          class="el-icon-close"></i></h2>
        <p></p>
        <div class="detail-main" style="margin-left: 60px;">
          <el-form label-width="80px" :model="formContact" ref="formContact">
            <el-form-item label="姓名" prop="name" :rules="{required: true,message: '请输入姓名', trigger: 'blur'}">
              <el-input v-model="formContact.name" style="width: 350px"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="phone" :rules="{required: true, validator:checkPhone,trigger: 'blur'}">
              <el-input v-model="formContact.phone"></el-input>
            </el-form-item>
            <el-form-item label="职位">
              <el-input v-model="formContact.title"></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input type="textarea" :rows="5" v-model="formContact.remark"></el-input>
            </el-form-item>
            <el-form-item style="margin-left: 100px;">
              <el-button type="primary" @click="contactSubmit('formContact')">提交</el-button>
              <el-button @click="handlerAddTask('formContact')">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <!--新增日志模态框-->
    <div v-show="logShow" class="detail">
      <div class="detail-wr">
        <h2 style="border-bottom: 1px solid #ccc;margin-bottom: 15px;padding-bottom: 10px">新增日志<i
          @click="handlerAddLog(false)" style="float: right;margin-right: 20px;cursor: pointer;"
          class="el-icon-close"></i></h2>
        <p style="color:#666;margin-bottom:15px;">{{this.originCustomerInfo.name}}</p>
        <div class="detail-main" style="margin-left: 60px;">
          <el-form label-width="-60px" :model="formLog" ref="formLog">
            <el-form-item>
              <el-input style="width: 630px" type="textarea" :rows="8" v-model="formLog.content"></el-input>
            </el-form-item>
            <p class="is-exist-log" v-if="isShowLog">内容不能为空且不能超过285个字符</p>
            <el-form-item style="margin-left: 210px;">
              <el-button type="primary" @click="addLogSubmit('formLog')" style="margin-right:50px;">提交</el-button>
              <el-button @click="handlerAddLog(false)">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <!--新增合同模态框-->
    <div v-show="contractShow" class="detail">
      <div class="detail-wr">
        <h2 style="border-bottom: 1px solid #ccc;margin-bottom: 15px;padding-bottom: 10px">创建合同</h2>
        <div class="detail-main" style="margin-left: 60px;">
          <el-form label-width="80px" :model="formContract" :rules="rules" ref="formContract">
            <el-form-item label="合同编号" prop="code">
              <span style="margin-right:10px;">{{numberPrefix}}-</span><el-input v-model="formContract.code" style="width: 350px"></el-input>
              <p v-if="contractToast" style="margin-bottom:-22px;color: red;font-size:13px;">合同编号已存在</p>
            </el-form-item>
            <el-form-item label="起始日期" prop="startDate">
              <el-date-picker type="date" placeholder="选择日期" v-model="formContract.startDate"
                              style="width: 100%;"></el-date-picker>
            </el-form-item>
            <el-form-item label="合同期限" prop="period" style="position: relative;">
              <el-input v-model.number="formContract.period" auto-complete="off"></el-input>
              <span style="position: absolute; right: 10px;top: 0; color: #ccc">月</span>
            </el-form-item>
            <el-form-item label="支付方式" prop="pay">
              <el-select v-model="formContract.pay" style="width: 350px">
                <el-option v-for="(item,key) in typeArrObj.PAY" :label="item.value" :value="item.code"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="月服务费" prop="price">
              <el-input v-model.number="formContract.price" auto-complete="off"></el-input>
            </el-form-item>
            <!--<el-form-item label="经手人" prop="user">
              <el-select v-model="formContract.user" style="width: 350px">
                <el-option label="" value="">占位</el-option>
              </el-select>
            </el-form-item>-->
            <el-form-item style="margin-left: 100px;">
              <el-button type="primary" @click="addContract('formContract')">提交</el-button>
              <el-button @click="handlerAddContract(false,'formContract')">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <!--工商信息模态框-->
    <div v-show="gsInfoShow" class="detail">
      <div class="detail-wr" style="padding:30px 0 0 10px!important;">
        <h2
          style="border-bottom: 1px solid #ccc;margin-bottom: 15px;padding-bottom: 10px;margin-left:40px;margin-right: 40px;">
          工商信息</h2>
        <div class="detail-main">
          <el-form label-width="120px" :model="formGSInfo" :rules="rules" ref="formGSInfo">
            <el-form-item style="width: 320px;" label="工商注册号" prop="gsh_zhucehao">
              <el-input v-model="formGSInfo.gsh_zhucehao"></el-input>
            </el-form-item>
            <el-form-item style="width: 320px;" label="注册类型" prop="gsh_zhuceleixing">
              <el-input v-model="formGSInfo.gsh_zhuceleixing"></el-input>
            </el-form-item>
            <el-form-item style="width: 320px;" label="注册资本" prop="gsh_zhuceziben">
              <el-input v-model.number="formGSInfo.gsh_zhuceziben" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item style="width: 320px;" label="经营范围" prop="gsh_jingyingfanwei">
              <el-input v-model="formGSInfo.gsh_jingyingfanwei"></el-input>
            </el-form-item>
            <el-form-item style="width: 320px;" label="营业期限" prop="gsh_yingyeqixian">
              <el-input v-model.number="formGSInfo.gsh_yingyeqixian" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item style="width: 320px;" label="行业类别" prop="gsh_hangyeleibie">
              <el-input v-model="formGSInfo.gsh_hangyeleibie"></el-input>
            </el-form-item>
            <el-form-item style="width: 320px;" label="注册地址" prop="gsh_zhucedizhi">
              <el-input v-model="formGSInfo.gsh_zhucedizhi"></el-input>
            </el-form-item>
            <el-form-item style="width: 320px;" label="成立日期" prop="gsh_chengliriqi">
              <el-date-picker type="date" placeholder="选择日期" v-model="formGSInfo.gsh_chengliriqi"
                              style="width: 100%;"></el-date-picker>
            </el-form-item>
            <div style="position: absolute; right: 40px; top:86px;">
              <el-form-item label="法定代表人" prop="gsh_faren">
                <el-input v-model="formGSInfo.gsh_faren"></el-input>
              </el-form-item>
              <el-form-item label="身份证号码" prop="gsh_shenfenzheng">
                <el-input v-model="formGSInfo.gsh_shenfenzheng"></el-input>
              </el-form-item>
              <el-form-item label="登记机关" prop="gsh_dengjijiguan">
                <el-input v-model="formGSInfo.gsh_dengjijiguan"></el-input>
              </el-form-item>
              <el-form-item label="工商所" prop="gsh_gongshangsuo">
                <el-input v-model="formGSInfo.gsh_gongshangsuo"></el-input>
              </el-form-item>
              <el-form-item label="工商局公式密码" prop="gsh_gongshimima">
                <el-input v-model="formGSInfo.gsh_gongshimima"></el-input>
              </el-form-item>
              <el-form-item label="组织机构代码证" prop="gsh_jigoudaima">
                <el-input v-model="formGSInfo.gsh_jigoudaima"></el-input>
              </el-form-item>
              <el-form-item label="有效期限" prop="gsh_jigoudaimayouxiaoqi">
                <el-date-picker type="date" placeholder="选择日期" v-model="formGSInfo.gsh_jigoudaimayouxiaoqi"
                                style="width: 100%;"></el-date-picker>
              </el-form-item>
            </div>
            <el-form-item style="position: relative; left: 170px;">
              <el-button type="primary" style="margin-right: 10px;" @click="addGSInfo('formGSInfo')">提交</el-button>
              <el-button @click="handlerAddGSInfo(false,'formGSInfo')">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <!--税务信息模态框-->
    <div v-show="taxInfoShow" class="detail">
      <div class="detail-wr">
        <h2 style="border-bottom: 1px solid #ccc;margin-bottom: 15px;padding-bottom: 10px">税务信息</h2>
        <div class="detail-main">
          <el-form label-width="150px" :model="formSWInfo" :rules="rules" ref="formSWInfo">
            <el-form-item label="税务登记证号码" prop="shw_dengjizheng">
              <el-input v-model="formSWInfo.shw_dengjizheng" style="width: 350px"></el-input>
            </el-form-item>
            <el-form-item label="计算机代码" prop="shw_jisuanjidaima">
              <el-input v-model="formSWInfo.shw_jisuanjidaima"></el-input>
            </el-form-item>
            <el-form-item label="综合申报密码" prop="shw_zongheshenbao_mima">
              <el-input v-model="formSWInfo.shw_zongheshenbao_mima" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="所得税管辖" prop="shw_suodeshuiguanxia">
              <el-input v-model="formSWInfo.shw_suodeshuiguanxia"></el-input>
            </el-form-item>
            <el-form-item label="国税下载密码" prop="shw_guoshuixiazai_mima">
              <el-input v-model="formSWInfo.shw_guoshuixiazai_mima" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="个税申报密码" prop="shw_geshuishenbao_mima">
              <el-input v-model="formSWInfo.shw_geshuishenbao_mima"></el-input>
            </el-form-item>
            <el-form-item style="position: relative; left: 100px;">
              <el-button type="primary" style="margin-right: 30px;" @click="addSWInfo('formSWInfo')">提交</el-button>
              <el-button @click="handlerAddSWInfo(false,'formSWInfo')">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <!--专管员信息模态框-->
    <div v-show="zgyInfoShow" class="detail">
      <div class="detail-wr">
        <h2 style="border-bottom: 1px solid #ccc;margin-bottom: 15px;padding-bottom: 10px">专管员信息</h2>
        <div class="detail-main">
          <el-form label-width="150px" :model="formZGYInfo" :rules="rules" ref="formZGYInfo">
            <el-form-item label="管辖所" prop="zhy_gs_guanxiasuo">
              <el-input v-model="formZGYInfo.zhy_gs_guanxiasuo" style="width: 350px"></el-input>
            </el-form-item>
            <el-form-item label="专管员" prop="zhy_gs_zhuanguanyuan">
              <el-input v-model="formZGYInfo.zhy_gs_zhuanguanyuan"></el-input>
            </el-form-item>
            <el-form-item label="所在地" prop="zhy_gs_suozaidi">
              <el-input v-model="formZGYInfo.zhy_gs_suozaidi"></el-input>
            </el-form-item>
            <el-form-item label="电话" prop="zhy_gs_phone" :rules="{validator:checkTelAnd,trigger: 'blur'}">
              <el-input v-model="formZGYInfo.zhy_gs_phone"></el-input>
            </el-form-item>
            <el-form-item style="position: relative; left: 100px;">
              <el-button type="primary" style="margin-right: 30px;" @click="addZGYInfo('formZGYInfo')">提交</el-button>
              <el-button @click="handlerAddZGYInfo(false,'formZGYInfo')">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <!--收款模态框-->
    <div v-show="payShow" class="detail">
      <div class="detail-wr">
        <h2 style="border-bottom: 1px solid #ccc;margin-bottom: 15px;padding-bottom: 10px">收款</h2>
        <p></p>
        <div class="detail-main" style="margin-left: 60px;">
          <el-form label-width="80px" :model="formPay" :rules="rules" ref="formPay">
            <el-form-item label="真实合同编号" prop="realContractId" style="display: none">
              <el-input v-model="formPay.realContractId" style="width: 350px" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="合同编号" prop="contractId">
              <el-input v-model="formPay.contractId" style="width: 350px" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="实收金额" prop="money">
              <el-input v-model.number="formPay.money"></el-input>
            </el-form-item>
            <el-form-item label="优惠金额" prop="discount">
              <el-input v-model.number="formPay.discount"></el-input>
            </el-form-item>
            <div style="overflow: hidden;margin-bottom: 10px;">
              <p style="float: right;">收款人：{{this.propuser}}</p><br>
              <p style="float: right;">收款时间：{{this.curPayTime}}</p>
            </div>
            <el-form-item style="margin-left: 100px;">
              <el-button type="primary" @click="addPay('formPay')">提交</el-button>
              <el-button @click="handlerPay(false,'formPay')">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <!--修改客户弹窗-->
    <add-customer :formCustomer="customerInfo" :typeArrObj="typeArrObj" :promptInfo="promptInfo"
                  :detailShow="modifyShow" @closeAdd="closeAddWind" @addInfo="modifyCusInfo"></add-customer>
    <!--任务分配弹窗-->
    <task-allocation :alloArr="obj" :allocateArrObj="allocateArrObj" :detailShow="taskAllocationShow"
                     @closeTask="closeTask" @addAlloInfo="addAlloInfo"></task-allocation>
  </div>
</template>
<script>
  import addCustomer from '../pub/addCustomer/addCustomer.vue'
  import taskAllocation from '../pub/taskAllocation/taskAllocation.vue'
  import util from '../../config/util.js'
  export default {
    components: {
      'add-customer': addCustomer,
      'task-allocation': taskAllocation,
    },
    data(){
      var validateCode = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入合同编号'));
        }
        else if (!(/^(\d|[a-z]|[A-Z]|-){6,9}$/.test(value))) {
          callback(new Error('请输入6-9位字母数字横线的合同编号'));
        } else {
          callback();
        }
      };
      var monthCharge = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入月服务费'));
        }
        else if (!(/^-?\d*$/.test(value))) {
          callback(new Error('月服务费必须为数字值'));
        } else if (value < 0) {
          callback(new Error('值不能为负数'));
        } else {
          callback();
        }
      };
      var contractPeriod = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('合同期限不能为空'));
        } else if (isNaN(value)) {
          callback(new Error('合同期限必须为数字'));
        } else if (!(/^-?\d+$/.test(value))) {
          callback(new Error('合同期限必须为整数值'));
        } else if (value < 0) {
          callback(new Error('月份不能为负数'));
        } else {
          callback();
        }
      };
      var self = this;
      return {
        selectMonth: '',
        /*pickerOptions0: {
         disabledDate(time) {
         //            各种日期小于当前日期则返回true即不能显示
         return time.getTime() < new Date(self.startMonth).getTime() - 8.64e7 || time.getTime() > new Date(self.endMonth).getTime() + 30 * 24 * 1000 * 3600;
         }
         },*/
        rules: {
          code: [
            {required: true, validator: validateCode, trigger: 'blur'}
          ],
          startDate: [
            {type: 'date', required: true, message: '请选择起始日期', trigger: 'change'}
          ],
          period: [
            {required: true, validator: contractPeriod, trigger: 'blur'}
          ],
          pay: [
            {required: true, message: '请选择支付方式', trigger: 'change'}
          ],
          price: [
            {required: true, validator: monthCharge, trigger: 'blur'}
          ],
          money: [
            {required: true, message: '请输入实收金额'},
            {type: 'number', message: '实收金额必须为数字值'}
          ],
          discount: [
            {required: true, message: '请输入优惠金额'},
            {type: 'number', message: '优惠金额必须为数字值'}
          ],
          gsh_yingyeqixian: [
            {type: 'number', message: '为数字值'}
          ],
          gsh_zhuceziben: [
            {type: 'number', message: '为数字值'}
          ]
        },
        logList: [],
        formCustomer: {
          name: '',
          boss: '',
          phone: '',
          area: '',
          industry: '',
          op_biz: '',
          op_tax: '',
          op_bill: ''
        },
        contractInfo: [],
        contractPayList: [],//某合同的payList具体收款信息
        contractPayHistory: [],//添加的收款记录
        formGSInfo: {
          gsh_zhucehao: '',
          gsh_zhuceleixing: '',
          gsh_zhuceziben: '',
          gsh_jingyingfanwei: '',
          gsh_yingyeqixian: '',
          gsh_hangyeleibie: '',
          gsh_zhucedizhi: '',

          gsh_chengliriqi: '',
          gsh_faren: '',
          gsh_shenfenzheng: '',
          gsh_dengjijiguan: '',
          gsh_gongshangsuo: '',
          gsh_gongshimima: '',
          gsh_jigoudaima: '',
          gsh_jigoudaimayouxiaoqi: ''
        },
        formSWInfo: {
          shw_dengjizheng: '',
          shw_suodeshuiguanxia: '',
          shw_jisuanjidaima: '',
          shw_guoshuixiazai_mima: '',
          shw_zongheshenbao_mima: '',
          shw_geshuishenbao_mima: ''
        },
        formZGYInfo: {
          zhy_gs_guanxiasuo: '',
          zhy_gs_suozaidi: '',
          zhy_gs_zhuanguanyuan: '',
          zhy_gs_phone: ''
        },
        formContract: {
          code: '',
          startDate: '',
          period: '',
          pay: '',
          price: '',
          user: ''
        },
        formPay: {
          realContractId: '',
          contractId: '',
          money: '',
          discount: 0
        },
        promptInfo: {
          title: '编辑客户信息',
          btnTitle: '提交'
        },
        formLog: {
          content: ''
        },
        curContractCode: '',//当前选择的合同编号
        contractCode: "",
        curPayTime: '',//收款时间
        input2: '',
        radio3: '全部',
        logUser: '',
        logKeyword: '',
        contractToast: false,
        showOtherInfo: false,
        //payToggle: true,
        taskAllocationShow: false,
        isShow: false,
        detailShow: false,
        logShow: false,
        contractShow: false,
        gsInfoShow: false,
        zgyInfoShow: false,
        taxInfoShow: false,
        payShow: false,
        modifyShow: false,
        isContract: false,
        activeName2: 'first',//默认选择tab
        customerId: this.$route.params.id,//根据路由获取客户id
        allocateArrObj: this.$route.params.allocateArrObj,//根据路由获取客户id
        roles: this.$route.params.roles,
//        查询详情获取的数据
        customerInfo: {
          type: Object
        },
//        深拷贝详情数据作为最前展示
        originCustomerInfo: {},
        oriObj: {},
        /*billInfo: {
         //          必須要加上以下否則報錯bill ofundefined
         process: {}
         },*/
        tasksInfo: {
          tasks: {}
        },
        obj: {},
        contactData: [],
        formContact: {
          name: "",
          phone: '',
          title: "",
          remark: ""
        },
        addOrEdit: '',
        id: '',
        index: '',
        length: 0,
        isShowLog: false,
        startMonth: '',
        endMonth: '',
        months: [],//月份状态
        multipleSelection: [],
        taxData: [],
        billImg: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADa0lEQVRYR8VXTXLaUAyWnp11Ycw+9AR1ThBygpBdJmNPyQmanqDJCcoNQuM3mexKTlB6gjo3IHsYYI1tdfTwo8/w/EO6CEtGT/okffokI7zzD985PuwBWFxd+ZkQp0KIafvh4fl/AS4Gg1a6Xp8jYkskyXP76Wlq+iwAmAfBLSB+2xoQxZ6UJ28Fsbi87GZHR78AoJv7WBLA104UjbTPLYBZGA4Q4L4QjOiHJ+XgrQD43TwIRoD42fQh0vSk/fgY839bAPMgmALisZF9bfBFEPTAdeP2aLSsAjkPghgQP2kbAnjuRFG/CCAMqS44B8w22fDj1k61OKORrc/MgyxJJhoEAfzuRFGvAGAWhmMEOAdL2bmXqeveI6J61OA3Euv1nUm4HMRQtYPozpPytgAgN7j1pLwxA8yCoI+IzI1NxkQvADAmxKmTpjFk2TJ1XR8BfELsIcCpJhwQDT0p70x/THQdvADAllWBmEQrAhh0pBxXVUC1CYCJp/k08qLouuxNqRApPXAcHqEWk8ZxnEEd2XQQXU1A/JL/VwrCCkA5SNM/PL8mYRr0vmAyDwLuuQIhiM7aUk52fVgBGIRciSTxd9WrKZC8EjyCx0Q06Uh5Vgsgz36h+AZwbarW7mOeDhCipUXFBiwfXW6ltQp7FZiHIU/BdyB69aTUEmpNehaGqqR6pssqw3ZqOozx07Z7ALSxqVZVjpsA0Fyw8akUgA3tLpADKqD2TCMA81ySieiibuabAshHmqcKvCgqJG3jgNoJTQEg0QeBWFBPSNOVSUyTiLUAqghjacFmf1h+ZiCD2C+elL5pvl+B/ChpIkA8spAkBYfKeZJMTe0wSLhdw6VTYPRr6UVRu6noVNnpe8CmK1Yl3B4nlrk9FNC2/CxE6/XHyptQOze3oHk+HRo8vwmZ/a2ysS7dhgYZY+G6Z003oQnS8LESrtu1+Shfx5vzS2k4AExFml5Uab4ZWGXuuj8B0QeilciyXtnbyg+T/LgYA+IHFYCIr5nChbPblrznfNpz2VeEeFO10Gq/jPIPFT4oNyA2IjVBxJiyLHYcZ5llmU8APeSM/51uryLL+nVVqwXAAfO9zmp3YwKxkpJoBQBD4brDJrxpBEAHUp9ZadpHIl7TXULcrmskigmAj47Km3EX9EEADh3DJvbvDuAvomEDP5bfdf8AAAAASUVORK5CYII=",
        accImg: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADa0lEQVRYR8VXTXLaUAyWnp11Ycw+9AR1ThBygpBdJmNPyQmanqDJCcoNQuM3mexKTlB6gjo3IHsYYI1tdfTwo8/w/EO6CEtGT/okffokI7zzD985PuwBWFxd+ZkQp0KIafvh4fl/AS4Gg1a6Xp8jYkskyXP76Wlq+iwAmAfBLSB+2xoQxZ6UJ28Fsbi87GZHR78AoJv7WBLA104UjbTPLYBZGA4Q4L4QjOiHJ+XgrQD43TwIRoD42fQh0vSk/fgY839bAPMgmALisZF9bfBFEPTAdeP2aLSsAjkPghgQP2kbAnjuRFG/CCAMqS44B8w22fDj1k61OKORrc/MgyxJJhoEAfzuRFGvAGAWhmMEOAdL2bmXqeveI6J61OA3Euv1nUm4HMRQtYPozpPytgAgN7j1pLwxA8yCoI+IzI1NxkQvADAmxKmTpjFk2TJ1XR8BfELsIcCpJhwQDT0p70x/THQdvADAllWBmEQrAhh0pBxXVUC1CYCJp/k08qLouuxNqRApPXAcHqEWk8ZxnEEd2XQQXU1A/JL/VwrCCkA5SNM/PL8mYRr0vmAyDwLuuQIhiM7aUk52fVgBGIRciSTxd9WrKZC8EjyCx0Q06Uh5Vgsgz36h+AZwbarW7mOeDhCipUXFBiwfXW6ltQp7FZiHIU/BdyB69aTUEmpNehaGqqR6pssqw3ZqOozx07Z7ALSxqVZVjpsA0Fyw8akUgA3tLpADKqD2TCMA81ySieiibuabAshHmqcKvCgqJG3jgNoJTQEg0QeBWFBPSNOVSUyTiLUAqghjacFmf1h+ZiCD2C+elL5pvl+B/ChpIkA8spAkBYfKeZJMTe0wSLhdw6VTYPRr6UVRu6noVNnpe8CmK1Yl3B4nlrk9FNC2/CxE6/XHyptQOze3oHk+HRo8vwmZ/a2ysS7dhgYZY+G6Z003oQnS8LESrtu1+Shfx5vzS2k4AExFml5Uab4ZWGXuuj8B0QeilciyXtnbyg+T/LgYA+IHFYCIr5nChbPblrznfNpz2VeEeFO10Gq/jPIPFT4oNyA2IjVBxJiyLHYcZ5llmU8APeSM/51uryLL+nVVqwXAAfO9zmp3YwKxkpJoBQBD4brDJrxpBEAHUp9ZadpHIl7TXULcrmskigmAj47Km3EX9EEADh3DJvbvDuAvomEDP5bfdf8AAAAASUVORK5CYII=",
        taxImg: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADa0lEQVRYR8VXTXLaUAyWnp11Ycw+9AR1ThBygpBdJmNPyQmanqDJCcoNQuM3mexKTlB6gjo3IHsYYI1tdfTwo8/w/EO6CEtGT/okffokI7zzD985PuwBWFxd+ZkQp0KIafvh4fl/AS4Gg1a6Xp8jYkskyXP76Wlq+iwAmAfBLSB+2xoQxZ6UJ28Fsbi87GZHR78AoJv7WBLA104UjbTPLYBZGA4Q4L4QjOiHJ+XgrQD43TwIRoD42fQh0vSk/fgY839bAPMgmALisZF9bfBFEPTAdeP2aLSsAjkPghgQP2kbAnjuRFG/CCAMqS44B8w22fDj1k61OKORrc/MgyxJJhoEAfzuRFGvAGAWhmMEOAdL2bmXqeveI6J61OA3Euv1nUm4HMRQtYPozpPytgAgN7j1pLwxA8yCoI+IzI1NxkQvADAmxKmTpjFk2TJ1XR8BfELsIcCpJhwQDT0p70x/THQdvADAllWBmEQrAhh0pBxXVUC1CYCJp/k08qLouuxNqRApPXAcHqEWk8ZxnEEd2XQQXU1A/JL/VwrCCkA5SNM/PL8mYRr0vmAyDwLuuQIhiM7aUk52fVgBGIRciSTxd9WrKZC8EjyCx0Q06Uh5Vgsgz36h+AZwbarW7mOeDhCipUXFBiwfXW6ltQp7FZiHIU/BdyB69aTUEmpNehaGqqR6pssqw3ZqOozx07Z7ALSxqVZVjpsA0Fyw8akUgA3tLpADKqD2TCMA81ySieiibuabAshHmqcKvCgqJG3jgNoJTQEg0QeBWFBPSNOVSUyTiLUAqghjacFmf1h+ZiCD2C+elL5pvl+B/ChpIkA8spAkBYfKeZJMTe0wSLhdw6VTYPRr6UVRu6noVNnpe8CmK1Yl3B4nlrk9FNC2/CxE6/XHyptQOze3oHk+HRo8vwmZ/a2ysS7dhgYZY+G6Z003oQnS8LESrtu1+Shfx5vzS2k4AExFml5Uab4ZWGXuuj8B0QeilciyXtnbyg+T/LgYA+IHFYCIr5nChbPblrznfNpz2VeEeFO10Gq/jPIPFT4oNyA2IjVBxJiyLHYcZ5llmU8APeSM/51uryLL+nVVqwXAAfO9zmp3YwKxkpJoBQBD4brDJrxpBEAHUp9ZadpHIl7TXULcrmskigmAj47Km3EX9EEADh3DJvbvDuAvomEDP5bfdf8AAAAASUVORK5CYII=",
        payImg: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADa0lEQVRYR8VXTXLaUAyWnp11Ycw+9AR1ThBygpBdJmNPyQmanqDJCcoNQuM3mexKTlB6gjo3IHsYYI1tdfTwo8/w/EO6CEtGT/okffokI7zzD985PuwBWFxd+ZkQp0KIafvh4fl/AS4Gg1a6Xp8jYkskyXP76Wlq+iwAmAfBLSB+2xoQxZ6UJ28Fsbi87GZHR78AoJv7WBLA104UjbTPLYBZGA4Q4L4QjOiHJ+XgrQD43TwIRoD42fQh0vSk/fgY839bAPMgmALisZF9bfBFEPTAdeP2aLSsAjkPghgQP2kbAnjuRFG/CCAMqS44B8w22fDj1k61OKORrc/MgyxJJhoEAfzuRFGvAGAWhmMEOAdL2bmXqeveI6J61OA3Euv1nUm4HMRQtYPozpPytgAgN7j1pLwxA8yCoI+IzI1NxkQvADAmxKmTpjFk2TJ1XR8BfELsIcCpJhwQDT0p70x/THQdvADAllWBmEQrAhh0pBxXVUC1CYCJp/k08qLouuxNqRApPXAcHqEWk8ZxnEEd2XQQXU1A/JL/VwrCCkA5SNM/PL8mYRr0vmAyDwLuuQIhiM7aUk52fVgBGIRciSTxd9WrKZC8EjyCx0Q06Uh5Vgsgz36h+AZwbarW7mOeDhCipUXFBiwfXW6ltQp7FZiHIU/BdyB69aTUEmpNehaGqqR6pssqw3ZqOozx07Z7ALSxqVZVjpsA0Fyw8akUgA3tLpADKqD2TCMA81ySieiibuabAshHmqcKvCgqJG3jgNoJTQEg0QeBWFBPSNOVSUyTiLUAqghjacFmf1h+ZiCD2C+elL5pvl+B/ChpIkA8spAkBYfKeZJMTe0wSLhdw6VTYPRr6UVRu6noVNnpe8CmK1Yl3B4nlrk9FNC2/CxE6/XHyptQOze3oHk+HRo8vwmZ/a2ysS7dhgYZY+G6Z003oQnS8LESrtu1+Shfx5vzS2k4AExFml5Uab4ZWGXuuj8B0QeilciyXtnbyg+T/LgYA+IHFYCIr5nChbPblrznfNpz2VeEeFO10Gq/jPIPFT4oNyA2IjVBxJiyLHYcZ5llmU8APeSM/51uryLL+nVVqwXAAfO9zmp3YwKxkpJoBQBD4brDJrxpBEAHUp9ZadpHIl7TXULcrmskigmAj47Km3EX9EEADh3DJvbvDuAvomEDP5bfdf8AAAAASUVORK5CYII=",
        billContainer: {},//取票
        taxContainer: {},//报税
        active: 1,
        activeTax: 1,
        countAtive: 1,
        billShow: false,
        billNotShow: false,
        taxShow: false,
        taxNotShow: false,
        listShow: false,
        accShow: false,
        accNotShow: false,
        billFn: function () {
        },
        taxFn: function () {
        },
        tabStatus: function () {
        },
        getArray: function () {
        },
        currentY: new Date().getFullYear(),
        currentM: new Date().getMonth() + 1,
        currentYear: '',
        billMonth: new Date().getMonth() + 1,
        taxMonth: new Date().getMonth() + 1,
        billDisplay: true,
        accDisplay: true,
        taxDisplay: true,
        payDisplay: true,
        yearDisplay: true,
        receiveDisplay: true,
        contractDisplay: true,
        cId: '',
        yearArr: '',
        prevY: false,
        nextY: false,
        isActive: true,
        accDate:'',
        doneStatus:'',//状态
        numberPrefix:''
      }
    },
    computed: {
      managePermission: function () {
        if (this.roles.indexOf('admin') != -1) {
          return true;
        }
        else {
          return false;
        }
      },
      /*accPermission: function () {
        if (this.roles.indexOf('acc') != -1 || this.roles.indexOf('admin') != -1) {
          return true;
        }
        else {
          return false;
        }
      },*/
      accAndAdminPermission: function () {
        if (this.roles.indexOf('acc') != -1 || this.roles.indexOf('admin') != -1) {
          return true;
        }
        else {
          return false;
        }
      },//报税和记账
      bizAndAdminPermission: function () {
        if (this.roles.indexOf('biz') != -1 || this.roles.indexOf('admin') != -1) {
          return true;
        }
        else {
          return false;
        }
      }//合同
    },
    props: {
      typeArrObj: {
        type: Object
      },
      propuser: {
        type: String
      }
    },
    methods: {
      startAccount(){
        var get_token = sessionStorage.getItem('token');
        var instance = this.$axios.create({
          headers: {
            'x-access-token': get_token
          }
        });
        instance.get(process.env.API_HOST + 'customer/jz/' + this.customerId)
          .then(function (response) {
            window.location.href = response.data.data;
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      /*   seleMonth(){
       //根据月份查询对应的process
       //        alert(this.selectMonth.getMonth())
       if (this.selectMonth != '') {
       const _TempDate = util.formatDate2(this.selectMonth);
       var self = this;
       var get_token = sessionStorage.getItem('token');
       var instance = this.$axios.create({
       headers: {'x-access-token': get_token, 'Content-Type': 'application/json'}
       });
       instance.get(process.env.API_HOST + 'process/' + this.customerId, {
       params: {
       period: _TempDate
       }
       }).then(function (response) {
       response = response.data;
       if (response.success == true) {
       self.billInfo.process = response.data || {};
       }
       })
       .catch(function (error) {
       console.log(error);
       });
       }
       },*/
      checkPhone(rule, value, callback){
        if (!value) {
          return callback(new Error('手机号码不能为空'));
        }
        if (!(/^1[34578][0-9]{9}$/.test(value))) {
          callback(new Error("手机号码格式不正确"));
        } else {
          callback();
        }
      },
      checkTelAnd(rule, value, callback){
        if (!(/^1[34578][0-9]{9}$/.test(value))) {
          callback(new Error("电话号码格式不正确"));
        } else {
          callback();
        }
      },
      showMore(){
        this.showOtherInfo = true;
      },
      showLess(){
        this.showOtherInfo = false;
      },
//      添加服务日志
      addLogSubmit(formName){
        if (!this.formLog.content) {
          this.isShowLog = true;
          return false;
        } else {
          this.isShowLog = false;
        }
        var self = this;
        var get_token = sessionStorage.getItem('token');
        const postData = {
          'content': this.formLog.content
        }
        var instance = this.$axios.create({
          headers: {
            'x-access-token': get_token
            , 'Content-Type': 'application/json'
          }
        });
        instance.post(process.env.API_HOST + 'record/' + this.customerId, postData)
          .then(function (response) {
            //console.log(response)
            if (response.data.success) {
              self.isShowLog = false;
              var obj = response.data.data;
              obj.time = util.formatDate(new Date(obj.time));
              if (self.logList.length >= 10) {
                self.logList.unshift(obj);
                self.logList.splice(-1, 1);
              } else {
                self.logList.unshift(obj);
              }
              self.length++;
              self.logShow = false;
              self.$refs[formName].resetFields();
            } else {
              //285
              self.isShowLog = true;
            }
          })
          .catch(function (error) {
            self.$message('添加失败');
          });
      },
      //终止合同
      handlerContract(command){
//        传入的是一个对象
        var cusId = this.customerId;
        var self = this;
        var get_token = sessionStorage.getItem('token');
        if (this.bizAndAdminPermission) {
          switch (command.type) {
            case 'delete': {
              this.$confirm('此操作将终止合同, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消'
              }).then(() => {
                var instance = this.$axios.create({
                  headers: {'x-access-token': get_token}
                });
                instance.post(process.env.API_HOST + 'contract/stop/' + command.id)
                  .then(function (response) {
                    if (response.data.success) {
                      //self.contractInfo.splice(command.index, 1);
                      instance.get(process.env.API_HOST + 'contract/list/' + self.customerId)
                        .then(function (response) {
                          response = response.data;
                          if (response.success == true) {
                            var conList = response.data.rows;
                            conList.forEach(function (ele) {
                              ele.startDate = util.formatDate(new Date(ele.startDate));
                              ele.endDate = util.addmulMonth(ele.startDate, ele.period);
                              ele.pay = util.swithPayType(ele.pay);
                            })
                            self.contractInfo = conList;
                          }
                        })
                        .catch(function (error) {
                          console.log(error);
                        });

                      self.months = [];
                      self.billDisplay = false,
                        self.accDisplay = false,
                        self.taxDisplay = false,
                        self.payDisplay = false,
                        self.yearDisplay = false,
                        self.receiveDisplay = false;
                      self.activeName2 = 'fourth';
                      if (self.contractInfo.length > 0) {
                        self.isContract = true;
                        var id = self.contractInfo[0].id;
                        var code = self.contractInfo[0].code;
                        instance.get(process.env.API_HOST + 'pay/list/' + id)
                          .then(function (response) {
                            response = response.data;
                            if (response.success == true) {
                              self.contractPayList = response.data.payList;
                              var list = response.data.payHistory.rows;
                              list.forEach(function (ele) {
                                ele.time = util.formatDate(new Date(ele.time));
                              })
                              self.contractPayHistory = list;
                              self.formPay.contractId = code;
                              self.formPay.realContractId = id;
                              self.curContractCode = code;//获取数据成功后显示当前合同编号
                              //self.payToggle = true;//获取数据成功后显示paylist表格
                            }
                          })
                          .catch(function (error) {
                            console.log(error);
                          });
                      } else {
                        self.isContract = false;
                        self.contractPayList = '',
                          self.contractPayHistory = '';
                        self.formPay.contractId = '';
                        self.formPay.realContractId = '';
                        self.curContractCode = '';//获取数据成功后显示当前合同编号
                      }
                      //                    重新获取列表
                      instance.get(process.env.API_HOST + 'process/periods/' + cusId)
                        .then(function (response) {
                          response = response.data;
                          if (response.success == true) {
                            if (response.data.length > 0) {
                              self.startMonth = response.data[0];
                              self.endMonth = response.data[response.data.length - 1];
                            } else {
                              self.selectMonth = '';
                              self.startMonth = '';
                              self.endMonth = '';
                            }
                          }
                        })
                        .catch(function (error) {
                          console.log(error);
                        });

                    }
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              }).catch(() => {

              });
            }
              ;
              break;
          }
        }
      },
//      获取本合同的所有收款记录
      handlerContractDet(key, id, code){
        if (key == 0) {
          this.receiveDisplay = true;
        } else {
          this.receiveDisplay = false;
        }
        var els = this.$refs.dd.getElementsByClassName('box-card');
        for (var i = 0; i < els.length; i++) {
          els[i].className = 'box-card';
        }
        els[key].className = 'box-card bg';
//        alert(id);
//      点击左侧的具体合同根据合同的id查获本合同详情绑定数据并显示此合同的收款信息
        var self = this;
        var get_token = sessionStorage.getItem('token');
        var instance = this.$axios.create({
          headers: {'x-access-token': get_token}
        });
        instance.get(process.env.API_HOST + 'pay/list/' + id)
          .then(function (response) {
            response = response.data;
            if (response.success == true) {
              self.contractPayList = response.data.payList;
              var list = response.data.payHistory.rows;
              list.forEach(function (ele) {
                ele.time = util.formatDate(new Date(ele.time));
              })
              self.contractPayHistory = list;
              self.formPay.contractId = code;
              self.formPay.realContractId = id;
              self.curContractCode = code;//获取数据成功后显示当前合同编号
              //self.payToggle = true;//获取数据成功后显示paylist表格
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
//      详情中的任务分配
      addAlloInfo(data){
        var self = this;
        var get_token = sessionStorage.getItem('token');
        const postDa = JSON.stringify(data);
        var instance = this.$axios.create({
          headers: {
            'x-access-token': get_token
            , 'Content-Type': 'application/json'
          }
        });
        instance.post(process.env.API_HOST + 'task/' + this.customerId, postDa)
          .then(function (response) {
            if (response.data.success) {
//              更新后台成功后同时把前台单独的任务分配对象tasksInfo更新
              self.tasksInfo.tasks = response.data.data;
              //console.log(response.data.data, 1123);
              self.oriObj = JSON.parse(JSON.stringify(self.obj));
              self.taskAllocationShow = false;
              self.$message('任务分配成功');
            }
          })
          .catch(function (error) {
            self.$message('设置失败');
          });
      },
      handleContractPageChange(){
        alert("合同管理页码");
      },
      handleContactPageChange(){
        alert("联系人页码");
      },
      closeAddWind(flag){
        this.modifyShow = flag;
      },
      closeTask(flag){
        this.taskAllocationShow = flag;
      },
      //新增联系人
      handlerAddTask(formName){
        this.detailShow = false;
        this.$refs[formName].resetFields();
      },
      addContact(flag){
        this.detailShow = flag;
        this.addOrEdit = "新增";
        this.formContact = {
          name: "",
          phone: '',
          title: "",
          remark: ""
        }
      },
      //修改联系人
      handleEdit(index){
        this.detailShow = true;
        this.addOrEdit = "修改";
        this.formContact.name = this.contactData[index].name;
        this.formContact.phone = this.contactData[index].phone;
        this.formContact.title = this.contactData[index].title;
        this.formContact.remark = this.contactData[index].remark;
        this.id = this.contactData[index].id;
        this.index = index;
      },
      addLog(){
        this.logShow = true;
        this.formLog.content = "";
        this.isShowLog = false;
      },
      handlerAddLog(flag){
        this.logShow = flag;
      },
      openAddContract(flag){
        this.contractShow = flag;
        var self = this;
        var get_token =sessionStorage.getItem('token');
        var instance = this.$axios.create({
          headers: {'Content-Type':'application/json','x-access-token':get_token}
        });
        instance.get(process.env.API_HOST+'corp/')
          .then(function (response) {
            self.numberPrefix=response.data.data.code;
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      handlerAddContract(flag, formName){
        this.contractShow = flag;
        this.$refs[formName].resetFields();
      },
      handlerAddGSInfo(flag, formName){
        this.gsInfoShow = flag;
//        this.$refs[formName].resetFields();
      },
      handlerAddSWInfo(flag, formName){
        this.taxInfoShow = flag;
//        this.$refs[formName].resetFields();
      },
      handlerAddZGYInfo(flag, formName){
        this.zgyInfoShow = flag;
//        this.$refs[formName].resetFields();
      },
      //收款提交
      addPay(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var postData = {
              "contractId": this.cId,
              "money": parseInt(this.formPay.money),
              "discount": parseInt(this.formPay.discount),
              "customerId": this.customerId
            }
            console.log(postData.contractId)
            var self = this;
            var get_token = sessionStorage.getItem('token');
            var instance = this.$axios.create({
              headers: {
                'x-access-token': get_token
                , 'Content-Type': 'application/json'
              }
            });
            instance.post(process.env.API_HOST + 'pay/add', postData)
              .then(function (response) {
                if (response.data.success) {
                  var temObj = response.data.data;
                  temObj.time = util.formatDate(new Date(response.data.data.time))
                  self.contractPayHistory.unshift(temObj);
                  self.$message('添加收款成功');
                  self.getArray(self.currentYear);
                  self.payShow = false;
                  self.$refs[formName].resetFields();
                  //收款状态联动
                  instance.get(process.env.API_HOST + 'pay/list/' + self.cId)
                    .then(function (response) {
                      response = response.data;
                      if (response.success == true) {
                        self.contractPayList = response.data.payList;
                        var list = response.data.payHistory.rows;
                        list.forEach(function (ele) {
                          ele.time = util.formatDate(new Date(ele.time));
                        })
                      }
                    })
                    .catch(function (error) {
                      console.log(error);
                    });

                }
              })
              .catch(function (error) {
                self.$message('添加失败');
              });
          }
        });
      },
      //创建合同
      addContract(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const postDate = util.formatDate(new Date(this.formContract.startDate));
            var postData = {
              "customerId": this.customerId,
              "code": this.formContract.code,
              "startDate": postDate,
              "period": parseInt(this.formContract.period),
              "pay": this.formContract.pay,
              "price": parseInt(this.formContract.price)
            }
            var self = this;
            var get_token = sessionStorage.getItem('token');
            var instance = this.$axios.create({
              headers: {
                'x-access-token': get_token
                , 'Content-Type': 'application/json'
              }
            });
            instance.post(process.env.API_HOST + 'contract/calculate', postData)
              .then(function (response) {
                if (response.data.success) {
                  //console.log(response.data.data);
                  self.$confirm(response.data.data, '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消'
                  }).then(() => {
                    instance.post(process.env.API_HOST + 'contract/add', postData)
                      .then(function (response) {
                        //console.log(response);
                        self.cId=response.data.data.id;
                        //console.log(self.cId);
                        if (response.data.message == '合同编号已经存在') {
                          self.contractToast = true;
                          return;
                        }
                        if (response.data.success) {
                          var obj = response.data.data;
                          obj.startDate = util.formatDate(new Date(obj.startDate));
                          obj.endDate = util.addmulMonth(obj.startDate, obj.period);
                          obj.pay = util.swithPayType(obj.pay);
                          self.contractInfo.unshift(obj);
                          self.contractToast = false;
                          self.$message('合同创建成功');
                          self.billDisplay = true,
                            self.accDisplay = true,
                            self.taxDisplay = true,
                            self.payDisplay = true,
                            self.yearDisplay = true,
                            self.receiveDisplay = true;
                            self.contractDisplay=true;
                          self.contractShow = false;
                          self.isContract = true;
                          self.$refs[formName].resetFields();
                          const id = response.data.data.id;
                          const code = response.data.data.code;
                          //              创建合同成功默认显示刚创建的这条数据
                          instance.get(process.env.API_HOST + 'pay/list/' + id)
                            .then(function (response) {
                              response = response.data;
                              if (response.success == true) {
                                self.contractPayList = response.data.payList;
                                var list = response.data.payHistory.rows;
                                list.forEach(function (ele) {
                                  ele.time = util.formatDate(new Date(ele.time));
                                })
                                self.contractCode = self.contractInfo[0].code;
                                self.contractPayHistory = list;
                                self.formPay.contractId = code;
                                self.formPay.realContractId = id;
                                self.curContractCode = code;//获取数据成功后显示当前合同编号
                                //self.payToggle = true;//获取数据成功后显示paylist表格

                              }
                            })
                            .catch(function (error) {
                              console.log(error);
                            });
                          instance.get(process.env.API_HOST + 'process/periods/' + self.customerId)
                            .then(function (response) {
                              response = response.data;
                              if (response.success == true) {
                                self.startMonth = response.data[0];
                                //                第一次创建合同后切换日期为第一个月的 不是第一次则不切换日期
                                if (self.selectMonth == '') {
                                  self.selectMonth = new Date(response.data[0]);
                                }
                                self.endMonth = response.data[response.data.length - 1];
                                var yearArr = [];
                                response.data.forEach((val, i) => {
                                  if (yearArr.indexOf(val.slice(0, 4)) == -1) {
                                    yearArr.push(val.slice(0, 4));
                                  }
                                })
                                yearArr.sort((a, b) => {
                                  return a - b;
                                })
                                self.yearArr = yearArr;
                                //console.log(self.yearArr)
                                if (self.yearArr[0] == self.currentY) {
                                  self.prevY = true;
                                }
                                if (self.yearArr[1] == undefined || self.yearArr[1] == self.currentY) {
                                  self.nextY = true;
                                }
                              }
                            })
                            .catch(function (error) {
                              console.log(error);
                            });
                          //刷新getArray
                          self.getArray(self.currentYear)
                          setTimeout(() => {
                            self.billFn();
                            self.taxFn(self.currentYear, self.currentM - 1);
                          }, 600)
                          //self.billNotShow = true;
                          //self.taxNotShow = true;
                          //self.listShow = true;
                        } else {
                          //console.log(response)
                          self.contractToast = false;
                          self.contractShow = false;
                          self.isContract = true;
                          self.$refs[formName].resetFields();
                          self.$confirm(response.data.message, '提示', {
                            confirmButtonText: '确定',
                            cancelButtonText: '取消'
                          }).then(() => {
                            //alert(1)
                          }).catch(() => {

                          });
                        }
                      })
                      .catch(function (error) {
                        self.contractToast = false;
                        self.contractShow = false;
                        self.isContract = true;
                        self.$refs[formName].resetFields();
                        self.$confirm('当前客户有正在进行中的合同，无法创建新的合同', '提示', {
                          confirmButtonText: '确定',
                          cancelButtonText: '取消'
                        }).then(() => {
                          //alert(1)
                        }).catch(() => {

                        });
                      });
                  }).catch(() => {
                  });
                } else {
                  self.$alert(response.data.data, '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                      self.contractShow=false;
                      self.$refs[formName].resetFields();
                    }
                  });
                }
              })
              .catch(function (error) {
                console.log(error);
              });
          }
        });
      },
      //点击收款
      openPay(flag){
        //console.log(this.formPay.realContractId)
        this.formPay.contractId = this.contractCode;
        this.curPayTime = util.formatDate(new Date());
        this.payShow = flag;
      },
      handlerPay(flag, formName){
        this.payShow = flag;
        //this.payToggle = false;
//        除了编号其他都清空
        var eles = this.$refs[formName].$children;
        for (var i = 2; i < 5; i++) {
          eles[i].resetField();
        }
      },
//      修改客戶基本信息
      modifyCusInfo(data){
        var self = this;
        var get_token = sessionStorage.getItem('token');
        const postData = JSON.stringify(data);
        var instance = this.$axios.create({
          headers: {
            'x-access-token': get_token
            , 'Content-Type': 'application/json'
          }
        });
        instance.post(process.env.API_HOST + 'customer/' + this.customerId, postData)
          .then(function (response) {
            if (response.data.success) {
//                  更新后台用户资料成功后把前台要展示的源数据对象更新
              self.originCustomerInfo = response.data.data;
              self.originCustomerInfo.createdAt = util.formatDate(new Date(self.originCustomerInfo.createdAt));
              self.$message('修改成功');
              self.modifyShow = false;
            }
          })
          .catch(function (error) {
            self.$message('修改失败');
          });
      },
//      修改工商所信息
      addGSInfo(formName){
        var self = this;
        var get_token = sessionStorage.getItem('token');
        var instance = this.$axios.create({
          headers: {
            'x-access-token': get_token
            , 'Content-Type': 'application/json'
          }
        });
//        判断用户有没有输入，没有输入则复位空输入则转换格式
        var _zb = this.formGSInfo.gsh_zhuceziben == null ? null : parseInt(this.formGSInfo.gsh_zhuceziben);
        var _qx = this.formGSInfo.gsh_yingyeqixian == null ? null : parseInt(this.formGSInfo.gsh_yingyeqixian);
        var _clrq = this.formGSInfo.gsh_chengliriqi == null ? null : util.formatDate(new Date(this.formGSInfo.gsh_chengliriqi));
        var _yxqx = this.formGSInfo.gsh_jigoudaimayouxiaoqi == null ? null : util.formatDate(new Date(this.formGSInfo.gsh_jigoudaimayouxiaoqi));
        var postData = {
          "gsh_zhucehao": this.formGSInfo.gsh_zhucehao,
          "gsh_zhuceleixing": this.formGSInfo.gsh_zhuceleixing,
          "gsh_zhuceziben": _zb,
          "gsh_jingyingfanwei": this.formGSInfo.gsh_jingyingfanwei,
          "gsh_yingyeqixian": _qx,
          "gsh_hangyeleibie": this.formGSInfo.gsh_hangyeleibie,
          "gsh_zhucedizhi": this.formGSInfo.gsh_zhucedizhi,
          "gsh_chengliriqi": _clrq,
          "gsh_faren": this.formGSInfo.gsh_faren,
          "gsh_shenfenzheng": this.formGSInfo.gsh_shenfenzheng,
          "gsh_dengjijiguan": this.formGSInfo.gsh_dengjijiguan,
          "gsh_gongshangsuo": this.formGSInfo.gsh_gongshangsuo,
          "gsh_gongshimima": this.formGSInfo.gsh_gongshimima,
          "gsh_jigoudaima": this.formGSInfo.gsh_jigoudaima,
          "gsh_jigoudaimayouxiaoqi": _yxqx
        }
        instance.post(process.env.API_HOST + 'customer/' + this.customerId, postData)
          .then(function (response) {
            if (response.data.success) {
              //console.log(response.data.data, 9999);
//                  更新后台用户资料成功后把前台要展示的源数据对象更新
              self.originCustomerInfo = response.data.data;
              self.originCustomerInfo.createdAt = util.formatDate(new Date(self.originCustomerInfo.createdAt));
              self.$message('成功');
              self.gsInfoShow = false;
            }
          })
          .catch(function (error) {
            self.$message('修改失败');
          });
      },
      //      修改税务信息
      addSWInfo(formName){
        var self = this;
        var get_token = sessionStorage.getItem('token');
        var instance = this.$axios.create({
          headers: {
            'x-access-token': get_token
            , 'Content-Type': 'application/json'
          }
        });
        var postData = {
          "shw_dengjizheng": this.formSWInfo.shw_dengjizheng,
          "shw_suodeshuiguanxia": this.formSWInfo.shw_suodeshuiguanxia,
          "shw_jisuanjidaima": this.formSWInfo.shw_jisuanjidaima,
          "shw_guoshuixiazai_mima": this.formSWInfo.shw_guoshuixiazai_mima,
          "shw_zongheshenbao_mima": this.formSWInfo.shw_zongheshenbao_mima,
          "shw_geshuishenbao_mima": this.formSWInfo.shw_geshuishenbao_mima,
        }
        instance.post(process.env.API_HOST + 'customer/' + this.customerId, postData)
          .then(function (response) {
            if (response.data.success) {
              self.originCustomerInfo = response.data.data;
              self.originCustomerInfo.createdAt = util.formatDate(new Date(self.originCustomerInfo.createdAt));
              self.$message('成功');
              self.taxInfoShow = false;
            }
          })
          .catch(function (error) {
            self.$message('修改失败');
          });
      },
      //      修改专员信息
      addZGYInfo(formName){
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var self = this;
            var get_token = sessionStorage.getItem('token');
            var instance = this.$axios.create({
              headers: {
                'x-access-token': get_token
                , 'Content-Type': 'application/json'
              }
            });
            var postData = {
              "zhy_gs_guanxiasuo": this.formZGYInfo.zhy_gs_guanxiasuo,
              "zhy_gs_suozaidi": this.formZGYInfo.zhy_gs_suozaidi,
              "zhy_gs_zhuanguanyuan": this.formZGYInfo.zhy_gs_zhuanguanyuan,
              "zhy_gs_phone": this.formZGYInfo.zhy_gs_phone
            }
            instance.post(process.env.API_HOST + 'customer/' + this.customerId, postData)
              .then(function (response) {
                if (response.data.success) {
                  self.originCustomerInfo = response.data.data;
                  self.originCustomerInfo.createdAt = util.formatDate(new Date(self.originCustomerInfo.createdAt));
                  self.$message('成功');
                  self.zgyInfoShow = false;
                }
              })
              .catch(function (error) {
                self.$message('修改失败');
              });
          }
        });
      },
      /*  处理取票业务
       handleTicket(command){
       const _TempDate = util.formatDate2(this.selectMonth);
       var temp = command == "getTicket" ? true : false;
       var self = this;
       var get_token = sessionStorage.getItem('token');
       var instance = this.$axios.create({
       headers: {
       'x-access-token': get_token
       , 'Content-Type': 'application/json'
       }
       });
       instance.post(process.env.API_HOST + 'process/' + this.customerId, {
       "period": _TempDate,
       "bill": temp
       }).then(function (response) {
       //          更新后台取票业务成功后把当前页面里的对象更新
       self.billInfo.process = response.data.data;
       console.log(response)
       })
       .catch(function (error) {
       self.$message('设置失败');
       });
       },
       //处理报税业务
       handleTax(command){
       const _TempDate = util.formatDate2(this.selectMonth);
       var temp = command == "tax" ? true : false;
       var self = this;
       var get_token = sessionStorage.getItem('token');
       var instance = this.$axios.create({
       headers: {
       'x-access-token': get_token
       , 'Content-Type': 'application/json'
       }
       });
       instance.post(process.env.API_HOST + 'process/' + this.customerId, {
       "period": _TempDate,
       "tax": temp
       }).then(function (response) {
       self.billInfo.process = response.data.data;
       })
       .catch(function (error) {
       self.$message('设置失败');
       });
       },*/
      handleMore(command){
        const id = this.customerId;
        var self = this;
        var get_token = sessionStorage.getItem('token');
        switch (command) {
          case 'delete': {
            const h = this.$createElement;
            this.$msgbox({
              title: '提示',
              message: h('p', null, [
                h('span', null, '您确定要删除吗？'),
                h('i', {style: 'color: teal'}, '')
              ]),
              showCancelButton: true,
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              beforeClose: (action, instance, done) => {
                if (action === 'confirm') {
                  instance.confirmButtonLoading = true;
                  instance.confirmButtonText = '';
                  done();
                  instance.confirmButtonLoading = false;

                  var instance = this.$axios.create({
                    headers: {'x-access-token': get_token}
                  });
                  instance.post(process.env.API_HOST + 'customer/del/' + id)
                    .then(function (response) {
                      //self.$message('删除成功');
                      setTimeout(function () {
                        self.$router.push({path: '/customerLeftMenu/myCustomer'})
                      }, 200)
                    })
                    .catch(function (error) {
                      console.log(error);
                    });

                } else {
                  done();
                }
              }
            })
          }
            ;
            break;
        }
      },
      modifyInfo(flag){
//      customerInfo是修改用户信息弹窗中绑定的信息 修改过后再次打开修改时要重置为上次修改的信息
        this.customerInfo = JSON.parse(JSON.stringify(this.originCustomerInfo));
        this.modifyShow = flag;
      },
      modifyGsInfo(flag){
        this.formGSInfo = JSON.parse(JSON.stringify(this.originCustomerInfo));
        this.gsInfoShow = flag;
      },
      modifySwInfo(flag){
        this.formSWInfo = JSON.parse(JSON.stringify(this.originCustomerInfo));
        this.taxInfoShow = flag;
      },
      modifyZgyInfo(flag){
        this.formZGYInfo = JSON.parse(JSON.stringify(this.originCustomerInfo));
        this.zgyInfoShow = flag;
      },
      taskAllocation(flag){
        this.taskAllocationShow = flag;
        this.obj = JSON.parse(JSON.stringify(this.oriObj));
      },
      //tab切换
      handleTabClick(tab) {
        //console.log(tab.name)
        tab = tab.name || tab;
        switch (tab) {
          //取票
          case 'first': {
          }
            break;
          //记账
          case 'second': {
            var self = this;
            var get_token = sessionStorage.getItem('token');
            var instance= this.$axios.create({
              headers: {'Content-Type': 'application/json', 'x-access-token': get_token}
            });
            instance.get(process.env.API_HOST + 'process/acc/last/'+this.customerId+'?date='+this.currentY+this.currentM)
              .then(function (response) {
                if(response.data.success){
                  //response.data.message='2017-8-6';
                  var arrDate=response.data.data;
                  arrDate=arrDate.split('-')[0]+'年'+arrDate.split('-')[1]+'月'+arrDate.split('-')[2]+'日';
                  self.accDate=arrDate;
                }
              })
              .catch(function (error) {
                console.log(error);
              });

          }
            break;
          //报税
          case 'third': {
          }
            break;
          //合同页面
          case 'fourth': {

          }
            break;
          //联系人渲染
          case 'fifth': {
            const id = this.customerId;
            var self = this;
            var get_token = sessionStorage.getItem('token');
            var instance = this.$axios.create({
              headers: {'x-access-token': get_token}
            });
            instance.get(process.env.API_HOST + 'contact/list/' + id)
              .then(function (response) {
                //console.log(response.data.data.rows)
                self.contactData = response.data.data.rows;
              })
              .catch(function (error) {
                console.log(error);
              });
          }
            break;
          //获取服务日志
          case 'sixth': {
            var self = this;
            var get_token = sessionStorage.getItem('token');
            var instance = this.$axios.create({
              headers: {'x-access-token': get_token}
            });
            instance.get(process.env.API_HOST + 'record/' + this.customerId, {
              params: {
                offset: 0,
                limit: 10
              }
            })
              .then(function (response) {
                response = response.data;
                if (response.success) {
                  var list = response.data.rows;
                  list.forEach(function (ele) {
                    ele.time = util.formatDate(new Date(ele.time));
                  })
                  self.logList = list;
                }
                self.length = response.data.count;
              })
              .catch(function (error) {
                console.log(error);
              });
          }
            break;
          //公司详情
          case 'seventh': {
          }
            break;
        }
      },
      //日志分页
      handleSerPageChange(val){
        //alert(val);
        var self = this;
        var get_token = sessionStorage.getItem('token');
        var instance = this.$axios.create({
          headers: {'x-access-token': get_token}
        });
        instance.get(process.env.API_HOST + 'record/' + self.customerId, {
          params: {
            offset: (val * 1 - 1) * 10,
            limit: 10,
            user: self.logUser,
            keyword: self.logKeyword
          }
        })
          .then(function (response) {
            //console.log(response)
            var list = response.data.data.rows;
            list.forEach(function (ele) {
              ele.time = util.formatDate(new Date(ele.time));
            })
            self.logList = list;
            self.length = response.data.data.count;
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      //日志搜索
      handleSearch(){
        this.logKeyword = this.input2;
        var self = this;
        var get_token = sessionStorage.getItem('token');
        var instance = this.$axios.create({
          headers: {'x-access-token': get_token}
        });
        instance.get(process.env.API_HOST + 'record/' + this.customerId, {
          params: {
            offset: 0,
            limit: 10,
            user: self.logUser,
            keyword: self.logKeyword
          }
        })
          .then(function (response) {
            response = response.data;
            if (response.success) {
              var list = response.data.rows;
              list.forEach(function (ele) {
                ele.time = util.formatDate(new Date(ele.time));
              })
              self.logList = list;
            }
            self.length = response.data.count;
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      //日志筛选
      selectTask(key){
        if (key == '全部') {
          this.logUser = "";
        } else {
          this.logUser = 1;
        }
        var self = this;
        var get_token = sessionStorage.getItem('token');
        var instance = this.$axios.create({
          headers: {'x-access-token': get_token}
        });
        instance.get(process.env.API_HOST + 'record/' + this.customerId, {
          params: {
            offset: 0,
            limit: 10,
            user: self.logUser,
            keyword: self.logKeyword
          }
        })
          .then(function (response) {
            response = response.data;
            if (response.success) {
              var list = response.data.rows;
              list.forEach(function (ele) {
                ele.time = util.formatDate(new Date(ele.time));
              })
              self.logList = list;
            }
            self.length = response.data.count;
          })
          .catch(function (error) {
            console.log(error);
          });

      },
      tableRowClassName(row, id){
//        欠款should为0则变色
        if (row.should == 0) {
          return 'notShould'
        } else {
          return 'should'
        }
      },
      //联系人添加
      contactSubmit(formName){
        const id = this.customerId;
        this.formContact.customerId = id;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            var self = this;
            if (this.addOrEdit == "新增") {
              //新增联系人
              var instance = this.$axios.create({
                headers: {'Content-Type': 'application/json', 'x-access-token': sessionStorage.getItem('token')}
              });
              instance.post(process.env.API_HOST + 'contact/add', this.formContact)
                .then(function (response) {
                  //console.log(response)
                  if (response.data.success) {
                    self.detailShow = false;
                    self.contactData.unshift(response.data.data);
                    //console.log(self.userData)
                    self.formContact = {
                      name: "",
                      phone: '',
                      title: "",
                      remark: ""
                    }
                  } else {
                    alert(response.data.message)
                  }
                })
                .catch(function (error) {
                  console.log(error);
                });
            } else {
              //修改用户
              var instance = this.$axios.create({
                headers: {'Content-Type': "application/json", 'x-access-token': sessionStorage.getItem('token')}
              });
              instance.post(process.env.API_HOST + 'contact/' + self.id, self.formContact)
                .then(function (response) {
                  //console.log(response)
                  if (response.data.success) {
                    self.detailShow = false;

                    self.contactData[self.index] = response.data.data;
                    self.contactData = Array.prototype.slice.call(self.contactData)
                    //console.log(self.contactData[self.index])
                    self.formContact = {
                      name: "",
                      phone: '',
                      title: "",
                      remark: ""
                    }
                  } else {
                    alert(response.data.message)
                  }
                })
                .catch(function (error) {
                  console.log(error);
                });
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //删除联系人
      handleDelete(index, row){
        const h = this.$createElement;
        this.$msgbox({
          title: '提示',
          message: h('p', null, [
            h('span', null, '您确定要删除吗？'),
            h('i', {style: 'color: teal'}, '')
          ]),
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {
            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '';
              done();
              instance.confirmButtonLoading = false;
              //请求后台删除数据
              //console.log(this.contactData[index].id)
              var key = this.contactData[index].id;
              var self = this;
              var get_token = sessionStorage.getItem('token');
              var instance = this.$axios.create({
                headers: {'x-access-token': get_token}
              });
              instance.post(process.env.API_HOST + 'contact/del/' + key)
                .then(function (response) {
                  //console.log(response)
                  if (response.data.success) {
                    //alert('删除成功！')
                    self.contactData.splice(index, 1);
                  }
                })
                .catch(function (error) {
                  console.log(error);
                });
            } else {
              done();
            }
          }
        })
      },
      smsGroup(){
        alert(555)
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        //console.log(this.multipleSelection)
        //console.log(this.multipleSelection[0])
      },
      //tab取款
      selectBill(index){
        this.active = index;
        this.billMonth = index;
        this.billFn();
      },
      //tab报税
      selectTax(index){
        //this.taxData=[];
        this.activeTax = index;
        this.taxFn(this.currentYear, index - 1);
      },
      //添加报税
      addTax(){
        this.taxData.push({});
      },
      //报税保存
      taxSave(){
        //alert('未报税')
        this.taxData.forEach((val, i) => {
          val.report = false;
          this.multipleSelection.forEach((item, j) => {
            if (val.id == item.id) {
              val.report = true;
            }
          })
        })
        var isPass = true;
        if (this.taxData == "") {
          this.$alert('请添加税种', '报税', {
            confirmButtonText: '确定',
            callback: action => {
            }
          });
          isPass = false;
        }
        this.taxData.forEach((val, i) => {
            console.log(val.name)
          if (val.money || val.money==0) {
            val.money = val.money + '';
          }
          if (val.name == ""||val.name == undefined) {
            this.$alert('税种不能为空', '报税', {
              confirmButtonText: '确定',
              callback: action => {
              }
            });
            isPass = false;
          } else if (val.money == "") {
            this.$alert('税额不能为空', '报税', {
              confirmButtonText: '确定',
              callback: action => {
              }
            });
            isPass = false;
          } else if (isNaN(val.money) || val.money < 0 || val.money[val.money.length - 1] == '.') {
            this.$alert('税额应为不小于0的有效数字', '报税', {
              confirmButtonText: '确定',
              callback: action => {
              }
            });
            isPass = false;
          } else if (val.money.split('.')[1] && val.money.split('.')[1].length > 2) {
            this.$alert('税额请保留两位有效数字', '报税', {
              confirmButtonText: '确定',
              callback: action => {
              }
            });
            isPass = false;
          }
        })
        //console.log(this.taxData)
        if (isPass) {
          var self = this;
          var get_token = sessionStorage.getItem('token');
          var instance = this.$axios.create({
            headers: {'Content-Type': 'application/json', 'x-access-token': get_token}
          });
          instance.post(process.env.API_HOST + 'tax/update/' + this.customerId + '?date=' + this.currentYear + this.activeTax, this.taxData)
            .then(function (response) {
              if (response.data.success) {
                self.$alert('报税保存成功', '报税', {
                  confirmButtonText: '确定',
                  callback: action => {
                    var taxPass = true;
                    response.data.data.forEach((val, i) => {
                      if (!val.report) {
                        taxPass = false;
                      }
                    })
                    if (taxPass) {
                      self.taxShow = true;
                      self.taxNotShow = false;
                      //请求大数组
                      self.getArray(self.currentYear)
                    } else {
                      self.taxShow = false;
                      self.taxNotShow = true;
                      //请求大数组
                      self.getArray(self.currentYear)
                    }
                  }
                });
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        }

      },
      //报税删除
      taxDelete(index, rows){
        //console.log(index)
        if (this.accAndAdminPermission) {
          if (this.taxData[index].date) {
            this.$confirm('您确定要删除吗?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消'
            }).then(() => {
              var self = this;
              var get_token = sessionStorage.getItem('token');
              var instance = this.$axios.create({
                headers: {'Content-Type': 'application/json', 'x-access-token': get_token}
              });
              instance.get(process.env.API_HOST + 'tax/del/' + rows.id)
                .then(function (response) {
                  if (response.data.success) {
                    self.taxData.splice(index, 1);
                  }
                })
                .catch(function (error) {
                  console.log(error);
                });
            }).catch(() => {

            });
          } else {
            this.taxData.splice(index, 1);
          }
        }
      },
      //取票按钮
      billBtn(item){
        var self = this;
        var billMonth = this.active > 9 ? this.active : '0' + this.active;
        var get_token = sessionStorage.getItem('token');
        var instance = this.$axios.create({
          headers: {
            'x-access-token': get_token
            , 'Content-Type': 'application/json'
          }
        });
        if (item == 0) {
          instance.post(process.env.API_HOST + 'process/' + this.customerId, {
            "period": self.currentYear + "" + billMonth,
            "bill": false
          }).then(function (response) {
            //console.log(response)
            if (response.data.success) {
              self.billShow = false;
              self.billNotShow = true;
              //改变大数组
              //self.getArray(self.currentYear);
              //console.log(self.billMonth)
              self.getArray(self.currentYear)
            }
          })
            .catch(function (error) {
              console.log('设置失败');
            });
        } else {
          instance.post(process.env.API_HOST + 'process/' + this.customerId, {
            "period": self.currentYear + "" + billMonth,
            "bill": true
          }).then(function (response) {
            //console.log(response.data.success)
            if (response.data.success) {
              self.billShow = true;
              self.billNotShow = false;
              //改变大数组
              //self.getArray(self.currentYear);
              self.getArray(self.currentYear)
            }
          })
            .catch(function (error) {
              console.log('设置失败');
            });
        }
      },
      //头部上一年
      prevStatus(){
        if (this.currentYear > this.yearArr[0]) {
          this.currentYear--;
          this.nextY = false;
          this.getArray(this.currentYear, true);

          this.isActive = false;
          this.active = 12;
          this.activeTax = 12;
          setTimeout(() => {
            this.billFn();
            this.taxFn(this.currentYear, 11);
          }, 300)
        }
        if (this.currentYear == this.yearArr[0]) {
          this.prevY = true;
        }
        if (this.currentYear == this.currentY) {
          this.isActive = true;
        }
      },
      //头部下一年
      nextStatus(){
        if (this.currentYear < this.currentY) {
          this.currentYear++;
          this.prevY = false;
          this.getArray(this.currentYear, true);

          this.isActive = false;
          this.active = 1;
          this.activeTax = 1;
          setTimeout(() => {
            console.log(this.months)
            this.billFn();
            this.taxFn(this.currentYear, 0);
          }, 300)
        }
        if (this.currentYear == this.currentY) {
          this.nextY = true;
          this.isActive = true;
        }
      }


    },
    created(){

    },
    mounted(){
      if (sessionStorage.getItem('token')) {
        this.customerInfo = {};
//获取详情
        const id = this.customerId;
        var self = this;
        var get_token = sessionStorage.getItem('token');
        var instance = this.$axios.create({
          headers: {'x-access-token': get_token}
        });
        //有效合同有无判断（合同内容显示）
        instance.get(process.env.API_HOST + 'contract/list/' + this.customerId)
          .then(function (response) {
            response = response.data;
            if(response.data.rows.length>0){
              self.contractDisplay=true;
            }else{
              self.contractDisplay=false;
            }
            if (response.success == true) {
              var conList = response.data.rows;
              conList.forEach(function (ele) {
                ele.startDate = util.formatDate(new Date(ele.startDate));
                ele.endDate = util.addmulMonth(ele.startDate, ele.period);
                ele.pay = util.swithPayType(ele.pay);
              })
              self.contractInfo = conList;
//                  默认绑定第一条合同的所有收款信息
              if (self.contractInfo.length > 0) {
                self.isContract = true;
                instance.get(process.env.API_HOST + 'pay/list/' + self.contractInfo[0].id)
                  .then(function (response) {
                    //console.log(response);
                    response = response.data;
                    if (response.success == true) {
                      self.contractPayList = response.data.payList;
                      var list = response.data.payHistory.rows;
                      list.forEach(function (ele) {
                        ele.time = util.formatDate(new Date(ele.time));
                      })
                      self.contractPayHistory = list;

                      self.formPay.contractId = self.contractInfo[0].code;
                      self.contractCode = self.contractInfo[0].code;
                      self.formPay.realContractId = self.contractInfo[0].id;
                      self.cId = self.contractInfo[0].id;
                      self.curContractCode = self.contractInfo[0].code;//获取数据成功后显示当前合同编号
                      //self.payToggle = true;//获取数据成功后显示paylist表格
                    }
                  })
                  .catch(function (error) {
                    console.log(error);
                  });
              } else {
                self.isContract = false;
              }
            }
          })
          .catch(function (error) {
            console.log(error);
          });

        instance.get(process.env.API_HOST + 'customer/' + id)
          .then(function (response) {
            //console.log(response)
            response = response.data;
            if (response.success == true) {
//                获取详情获取的是包括process和tasks的全部数据
//                var list=;
//                list.forEach(function (ele) {
//                  ele.createdAt=util.formatDate(new Date(ele.createdAt));
//                })
              self.customerInfo = response.data;
              /*if (JSON.stringify(self.customerInfo.process) == "{}") {
               self.billInfo.process = {bill: false, tax: false, acc: false};
               //              在没有设置取票等等时 设置其属性默认为false
               } else {
               self.billInfo.process = self.customerInfo.process;
               }*/
//                把获取详情中的任务对象赋给当前的tasks对象
              self.tasksInfo.tasks = self.customerInfo.tasks;
//                深复制一份数据originCustomerInfo作为当前页面展示
              self.originCustomerInfo = JSON.parse(JSON.stringify(self.customerInfo));
              //console.log(self.originCustomerInfo)
//                设置任务分配框要绑定的数据
              self.originCustomerInfo.createdAt = util.formatDate(new Date(self.originCustomerInfo.createdAt));
              self.obj = {
                acc: '',
                leg: '',
                biz: ''
              }
              if (response.data.tasks.acc) {
                self.obj.acc = response.data.tasks.acc.userId;
              }
              if (response.data.tasks.leg) {
                self.obj.leg = response.data.tasks.leg.userId;
              }
              if (response.data.tasks.biz) {
                self.obj.biz = response.data.tasks.biz.userId;
              }
              self.oriObj = JSON.parse(JSON.stringify(self.obj));
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        var instance2 = this.$axios.create({
          headers: {'Content-Type': 'application/json', 'x-access-token': get_token}
        });
        instance2.get(process.env.API_HOST + 'process/periods/' + id)
          .then(function (response) {
            //console.log(response)
            if (response.data.success == true) {
              /*   self.startMonth = response.data[0];
               //                初始化默认为第一个月
               if (response.data.length > 0) {
               self.selectMonth = new Date(response.data[0]);
               } else {
               self.selectMonth = ''
               }
               self.endMonth = response.data[response.data.length - 1];*/
              var yearArr = [];
              response.data.data.forEach((val, i) => {
                if (yearArr.indexOf(val.slice(0, 4)) == -1) {
                  yearArr.push(val.slice(0, 4));
                }
              })
              yearArr.sort((a, b) => {
                return a - b;
              })
              self.yearArr = yearArr;
              if (self.yearArr[0] == self.currentY) {
                self.prevY = true;
              }
              if (self.yearArr[1] == undefined || self.yearArr[1] >= self.currentY) {
                self.nextY = true;
              }
            }
          })
          .catch(function (error) {
            console.log(error);
          });

        var currentMonth = new Date().getMonth();
        this.currentYear = new Date().getFullYear();

        this.getArray = function (y, m) {
          var self = this;
          var get_token = sessionStorage.getItem('token');
          var instance4 = this.$axios.create({
            headers: {'Content-Type': 'application/json', 'x-access-token': get_token}
          });
          instance4.get(process.env.API_HOST + 'process/status/' + this.customerId + '?date=' + y)
            .then(function (response) {
              //console.log(response);
              self.months = response.data.data;
              self.months.sort((a, b) => {
                return a.period - b.period;
              })
              //console.log(self.months)
              if (self.months[self.currentM - 1].acc) {
                self.accShow = true;
              } else {
                self.accNotShow = true;
              }
              if (!m) {
                var doneSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACgElEQVRYR7VXy3XTQBS9zwucHUoFmAoYbcBekVSAqQCoAHdA0oHpIKkgogLCyoGNxhUkdBDvMOfgy3ljScj6jmQxSx3N3Pvu+ws6HPPdzEG8ATABEAjE6HWCFsAjgAcAkZ3aL77PStuPZmUmEHwCMBdI0PZ/QkjJRCAu7cwqqdpTS8DEJsBvfASx8AUuohB8hGCJJ/hsQ6ukSqeSgAPf4msqsY/VTf84F41xXkWiRMD8MAY7B+4lty85p8YI5/al1XjJzgGBxPL7ocFTNEdijOd5JTICQ8tep0zRHf8IrMyFiGi0D3uInxA8yz9KUrPjQr85AkmqxUNLT/IDThDJVm4BvDhwBRFqiqYErkTk3ZCmK7id2StnYGyCEgny2s7se0cgvAs1R58ORSAPnr6pKovIfV4FO7WnouVVKDf/FbymrlD4VszKDCZ/peUNRY3ktRK4FZHXVQpotIrIwsc9XcEVj+Q3Ce9CrUxZhGY+SoJIK6PsXBTXxkgfcEcAtEqAReuLDzaR6AueYnoRcKlUocSx4K4Qtbkgr06exBDgANZtQZgVkyyftVv+gUmLTPa9Rwt3QdiWhlWWFmOmbyPbp6FHIWoi0RfcZYEWIt9SPJDP8+Jt4mkcdGpGxQZzzNim8mfNKGkUWpBaG1LaYo8BB7AhqYG8b8fJTOA9kBB8EIjuBr1OaSCp69m9Xm+/tOaYZ+lcWBpKZSu6SLS6oh2n8o8Nx5xUDqX5QtPWfHqDj3jWOJbnq1pxhOoJml47kD3/VvNq9gsL33mghqBG+xInWHZazQ4akC6ngGbIvENsKHCk93ovp1UWufV8ByWiA6aubukgsya5X89HiOwrq+Be5y/2bbDB519G1QAAAABJRU5ErkJggg==";
                var notSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADa0lEQVRYR8VXTXLaUAyWnp11Ycw+9AR1ThBygpBdJmNPyQmanqDJCcoNQuM3mexKTlB6gjo3IHsYYI1tdfTwo8/w/EO6CEtGT/okffokI7zzD985PuwBWFxd+ZkQp0KIafvh4fl/AS4Gg1a6Xp8jYkskyXP76Wlq+iwAmAfBLSB+2xoQxZ6UJ28Fsbi87GZHR78AoJv7WBLA104UjbTPLYBZGA4Q4L4QjOiHJ+XgrQD43TwIRoD42fQh0vSk/fgY839bAPMgmALisZF9bfBFEPTAdeP2aLSsAjkPghgQP2kbAnjuRFG/CCAMqS44B8w22fDj1k61OKORrc/MgyxJJhoEAfzuRFGvAGAWhmMEOAdL2bmXqeveI6J61OA3Euv1nUm4HMRQtYPozpPytgAgN7j1pLwxA8yCoI+IzI1NxkQvADAmxKmTpjFk2TJ1XR8BfELsIcCpJhwQDT0p70x/THQdvADAllWBmEQrAhh0pBxXVUC1CYCJp/k08qLouuxNqRApPXAcHqEWk8ZxnEEd2XQQXU1A/JL/VwrCCkA5SNM/PL8mYRr0vmAyDwLuuQIhiM7aUk52fVgBGIRciSTxd9WrKZC8EjyCx0Q06Uh5Vgsgz36h+AZwbarW7mOeDhCipUXFBiwfXW6ltQp7FZiHIU/BdyB69aTUEmpNehaGqqR6pssqw3ZqOozx07Z7ALSxqVZVjpsA0Fyw8akUgA3tLpADKqD2TCMA81ySieiibuabAshHmqcKvCgqJG3jgNoJTQEg0QeBWFBPSNOVSUyTiLUAqghjacFmf1h+ZiCD2C+elL5pvl+B/ChpIkA8spAkBYfKeZJMTe0wSLhdw6VTYPRr6UVRu6noVNnpe8CmK1Yl3B4nlrk9FNC2/CxE6/XHyptQOze3oHk+HRo8vwmZ/a2ysS7dhgYZY+G6Z003oQnS8LESrtu1+Shfx5vzS2k4AExFml5Uab4ZWGXuuj8B0QeilciyXtnbyg+T/LgYA+IHFYCIr5nChbPblrznfNpz2VeEeFO10Gq/jPIPFT4oNyA2IjVBxJiyLHYcZ5llmU8APeSM/51uryLL+nVVqwXAAfO9zmp3YwKxkpJoBQBD4brDJrxpBEAHUp9ZadpHIl7TXULcrmskigmAj47Km3EX9EEADh3DJvbvDuAvomEDP5bfdf8AAAAASUVORK5CYII=";
                if(response.data.status.acc){
                  self.accImg = doneSrc;
                }else{
                  self.accImg = notSrc;
                }
                if(response.data.status.bill){
                  self.billImg = doneSrc;
                }else{
                  self.billImg = notSrc;
                }
                if(response.data.status.tax){
                  self.taxImg = doneSrc;
                }else{
                  self.taxImg = notSrc;
                }
                if(response.data.status.pay){
                  self.payImg = doneSrc;
                }else{
                  self.payImg = notSrc;
                }
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        }
        //显示tab状态

        /*this.tabStatus = function () {
          //console.log(this.months)
          var m = new Date().getMonth() + 1;
          var arrAcc = [], arrBill = [], arrTax = [], arrPay = [];
          var doneSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACgElEQVRYR7VXy3XTQBS9zwucHUoFmAoYbcBekVSAqQCoAHdA0oHpIKkgogLCyoGNxhUkdBDvMOfgy3ljScj6jmQxSx3N3Pvu+ws6HPPdzEG8ATABEAjE6HWCFsAjgAcAkZ3aL77PStuPZmUmEHwCMBdI0PZ/QkjJRCAu7cwqqdpTS8DEJsBvfASx8AUuohB8hGCJJ/hsQ6ukSqeSgAPf4msqsY/VTf84F41xXkWiRMD8MAY7B+4lty85p8YI5/al1XjJzgGBxPL7ocFTNEdijOd5JTICQ8tep0zRHf8IrMyFiGi0D3uInxA8yz9KUrPjQr85AkmqxUNLT/IDThDJVm4BvDhwBRFqiqYErkTk3ZCmK7id2StnYGyCEgny2s7se0cgvAs1R58ORSAPnr6pKovIfV4FO7WnouVVKDf/FbymrlD4VszKDCZ/peUNRY3ktRK4FZHXVQpotIrIwsc9XcEVj+Q3Ce9CrUxZhGY+SoJIK6PsXBTXxkgfcEcAtEqAReuLDzaR6AueYnoRcKlUocSx4K4Qtbkgr06exBDgANZtQZgVkyyftVv+gUmLTPa9Rwt3QdiWhlWWFmOmbyPbp6FHIWoi0RfcZYEWIt9SPJDP8+Jt4mkcdGpGxQZzzNim8mfNKGkUWpBaG1LaYo8BB7AhqYG8b8fJTOA9kBB8EIjuBr1OaSCp69m9Xm+/tOaYZ+lcWBpKZSu6SLS6oh2n8o8Nx5xUDqX5QtPWfHqDj3jWOJbnq1pxhOoJml47kD3/VvNq9gsL33mghqBG+xInWHZazQ4akC6ngGbIvENsKHCk93ovp1UWufV8ByWiA6aubukgsya5X89HiOwrq+Be5y/2bbDB519G1QAAAABJRU5ErkJggg==";
          var notSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADa0lEQVRYR8VXTXLaUAyWnp11Ycw+9AR1ThBygpBdJmNPyQmanqDJCcoNQuM3mexKTlB6gjo3IHsYYI1tdfTwo8/w/EO6CEtGT/okffokI7zzD985PuwBWFxd+ZkQp0KIafvh4fl/AS4Gg1a6Xp8jYkskyXP76Wlq+iwAmAfBLSB+2xoQxZ6UJ28Fsbi87GZHR78AoJv7WBLA104UjbTPLYBZGA4Q4L4QjOiHJ+XgrQD43TwIRoD42fQh0vSk/fgY839bAPMgmALisZF9bfBFEPTAdeP2aLSsAjkPghgQP2kbAnjuRFG/CCAMqS44B8w22fDj1k61OKORrc/MgyxJJhoEAfzuRFGvAGAWhmMEOAdL2bmXqeveI6J61OA3Euv1nUm4HMRQtYPozpPytgAgN7j1pLwxA8yCoI+IzI1NxkQvADAmxKmTpjFk2TJ1XR8BfELsIcCpJhwQDT0p70x/THQdvADAllWBmEQrAhh0pBxXVUC1CYCJp/k08qLouuxNqRApPXAcHqEWk8ZxnEEd2XQQXU1A/JL/VwrCCkA5SNM/PL8mYRr0vmAyDwLuuQIhiM7aUk52fVgBGIRciSTxd9WrKZC8EjyCx0Q06Uh5Vgsgz36h+AZwbarW7mOeDhCipUXFBiwfXW6ltQp7FZiHIU/BdyB69aTUEmpNehaGqqR6pssqw3ZqOozx07Z7ALSxqVZVjpsA0Fyw8akUgA3tLpADKqD2TCMA81ySieiibuabAshHmqcKvCgqJG3jgNoJTQEg0QeBWFBPSNOVSUyTiLUAqghjacFmf1h+ZiCD2C+elL5pvl+B/ChpIkA8spAkBYfKeZJMTe0wSLhdw6VTYPRr6UVRu6noVNnpe8CmK1Yl3B4nlrk9FNC2/CxE6/XHyptQOze3oHk+HRo8vwmZ/a2ysS7dhgYZY+G6Z003oQnS8LESrtu1+Shfx5vzS2k4AExFml5Uab4ZWGXuuj8B0QeilciyXtnbyg+T/LgYA+IHFYCIr5nChbPblrznfNpz2VeEeFO10Gq/jPIPFT4oNyA2IjVBxJiyLHYcZ5llmU8APeSM/51uryLL+nVVqwXAAfO9zmp3YwKxkpJoBQBD4brDJrxpBEAHUp9ZadpHIl7TXULcrmskigmAj47Km3EX9EEADh3DJvbvDuAvomEDP5bfdf8AAAAASUVORK5CYII=";
          this.accImg = doneSrc;
          this.billImg = doneSrc;
          this.taxImg = doneSrc;
          this.payImg = doneSrc;
          this.months.forEach(function (item, i) {
            if (item.acc != null) {
              arrAcc.push(item)
            }
            if (item.bill != null) {
              arrBill.push(item)
            }
            if (item.tax != null) {
              arrTax.push(item)
            }
            if (item.pay != null) {
              arrPay.push(item)
            }
          })
          arrAcc.forEach((item, i) => {
            if (item.period <= m) {
              if (item.acc == 0) {
                this.accImg = notSrc;
              }
            }
          })
          arrBill.forEach((item, i) => {
            if (item.period <= m) {
              if (item.bill == 0) {
                this.billImg = notSrc;
              }
            }
          })
          arrTax.forEach((item, i) => {
            if (item.period <= m) {
              if (item.tax == 0) {
                this.taxImg = notSrc;
              }
            }
          })
          arrPay.forEach((item, i) => {
            if (item.period <= m) {
              if (item.pay == 0) {
                this.payImg = notSrc;
              }
            }
          })
          if (arrAcc.length == 0 && arrBill.length == 0 && arrTax.length == 0 && arrPay.length == 0) {
            this.accImg = this.billImg = this.taxImg = this.payImg = notSrc;
          }
        }*/
        /*this.tabStatus = function () {
          var doneSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACgElEQVRYR7VXy3XTQBS9zwucHUoFmAoYbcBekVSAqQCoAHdA0oHpIKkgogLCyoGNxhUkdBDvMOfgy3ljScj6jmQxSx3N3Pvu+ws6HPPdzEG8ATABEAjE6HWCFsAjgAcAkZ3aL77PStuPZmUmEHwCMBdI0PZ/QkjJRCAu7cwqqdpTS8DEJsBvfASx8AUuohB8hGCJJ/hsQ6ukSqeSgAPf4msqsY/VTf84F41xXkWiRMD8MAY7B+4lty85p8YI5/al1XjJzgGBxPL7ocFTNEdijOd5JTICQ8tep0zRHf8IrMyFiGi0D3uInxA8yz9KUrPjQr85AkmqxUNLT/IDThDJVm4BvDhwBRFqiqYErkTk3ZCmK7id2StnYGyCEgny2s7se0cgvAs1R58ORSAPnr6pKovIfV4FO7WnouVVKDf/FbymrlD4VszKDCZ/peUNRY3ktRK4FZHXVQpotIrIwsc9XcEVj+Q3Ce9CrUxZhGY+SoJIK6PsXBTXxkgfcEcAtEqAReuLDzaR6AueYnoRcKlUocSx4K4Qtbkgr06exBDgANZtQZgVkyyftVv+gUmLTPa9Rwt3QdiWhlWWFmOmbyPbp6FHIWoi0RfcZYEWIt9SPJDP8+Jt4mkcdGpGxQZzzNim8mfNKGkUWpBaG1LaYo8BB7AhqYG8b8fJTOA9kBB8EIjuBr1OaSCp69m9Xm+/tOaYZ+lcWBpKZSu6SLS6oh2n8o8Nx5xUDqX5QtPWfHqDj3jWOJbnq1pxhOoJml47kD3/VvNq9gsL33mghqBG+xInWHZazQ4akC6ngGbIvENsKHCk93ovp1UWufV8ByWiA6aubukgsya5X89HiOwrq+Be5y/2bbDB519G1QAAAABJRU5ErkJggg==";
          var notSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADa0lEQVRYR8VXTXLaUAyWnp11Ycw+9AR1ThBygpBdJmNPyQmanqDJCcoNQuM3mexKTlB6gjo3IHsYYI1tdfTwo8/w/EO6CEtGT/okffokI7zzD985PuwBWFxd+ZkQp0KIafvh4fl/AS4Gg1a6Xp8jYkskyXP76Wlq+iwAmAfBLSB+2xoQxZ6UJ28Fsbi87GZHR78AoJv7WBLA104UjbTPLYBZGA4Q4L4QjOiHJ+XgrQD43TwIRoD42fQh0vSk/fgY839bAPMgmALisZF9bfBFEPTAdeP2aLSsAjkPghgQP2kbAnjuRFG/CCAMqS44B8w22fDj1k61OKORrc/MgyxJJhoEAfzuRFGvAGAWhmMEOAdL2bmXqeveI6J61OA3Euv1nUm4HMRQtYPozpPytgAgN7j1pLwxA8yCoI+IzI1NxkQvADAmxKmTpjFk2TJ1XR8BfELsIcCpJhwQDT0p70x/THQdvADAllWBmEQrAhh0pBxXVUC1CYCJp/k08qLouuxNqRApPXAcHqEWk8ZxnEEd2XQQXU1A/JL/VwrCCkA5SNM/PL8mYRr0vmAyDwLuuQIhiM7aUk52fVgBGIRciSTxd9WrKZC8EjyCx0Q06Uh5Vgsgz36h+AZwbarW7mOeDhCipUXFBiwfXW6ltQp7FZiHIU/BdyB69aTUEmpNehaGqqR6pssqw3ZqOozx07Z7ALSxqVZVjpsA0Fyw8akUgA3tLpADKqD2TCMA81ySieiibuabAshHmqcKvCgqJG3jgNoJTQEg0QeBWFBPSNOVSUyTiLUAqghjacFmf1h+ZiCD2C+elL5pvl+B/ChpIkA8spAkBYfKeZJMTe0wSLhdw6VTYPRr6UVRu6noVNnpe8CmK1Yl3B4nlrk9FNC2/CxE6/XHyptQOze3oHk+HRo8vwmZ/a2ysS7dhgYZY+G6Z003oQnS8LESrtu1+Shfx5vzS2k4AExFml5Uab4ZWGXuuj8B0QeilciyXtnbyg+T/LgYA+IHFYCIr5nChbPblrznfNpz2VeEeFO10Gq/jPIPFT4oNyA2IjVBxJiyLHYcZ5llmU8APeSM/51uryLL+nVVqwXAAfO9zmp3YwKxkpJoBQBD4brDJrxpBEAHUp9ZadpHIl7TXULcrmskigmAj47Km3EX9EEADh3DJvbvDuAvomEDP5bfdf8AAAAASUVORK5CYII=";
          if(this.doneStatus.acc){
            this.accImg = doneSrc;
          }else{
            this.accImg = notSrc;
          }
          if(this.doneStatus.bill){
            this.billImg = doneSrc;
          }else{
            this.billImg = notSrc;
          }
          if(this.doneStatus.tax){
            this.taxImg = doneSrc;
          }else{
            this.taxImg = notSrc;
          }
          if(this.doneStatus.pay){
            this.payImg = doneSrc;
          }else{
            this.payImg = notSrc;
          }
        }*/
        this.billFn = function () {
          if (this.months[this.active - 1].bill == null) {
            this.billShow = false;
            this.billNotShow = false;
          } else if (this.months[this.active - 1].bill) {
            this.billShow = true;
            this.billNotShow = false;
          } else {
            this.billShow = false;
            this.billNotShow = true;
          }
        }
        this.taxFn = function (y, m) {
          //console.log(this.months)
          if (this.months[this.activeTax - 1].tax == null) {
            this.taxShow = false;
            this.taxNotShow = false;
            this.listShow = false;
          } else {
            if (this.months[this.activeTax - 1].tax) {
              this.taxShow = true;
              this.taxNotShow = false;
              this.listShow = true;
            } else {
              this.taxShow = false;
              this.taxNotShow = true;
              this.listShow = true;
            }
            var self = this;
            var get_token = sessionStorage.getItem('token');
            var instance3 = this.$axios.create({
              headers: {'Content-Type': 'application/json', 'x-access-token': get_token}
            });
            instance3.get(process.env.API_HOST + 'tax/list/' + this.customerId + '?date=' + y + (m * 1 + 1))
              .then(function (response) {
                if (response.data.success) {
                  //console.log(response)
                  if (response.data.data.length > 0) {
                    //console.log(response)
                    self.taxData = response.data.data;
                  } else {
                    //默认税种
                    instance3.get(process.env.API_HOST + 'tax/class/?date=' + (m * 1 + 1))
                      .then(function (response) {
                        //console.log(response)
                        if (response.data.success) {
                          self.taxData = response.data.data;
                        }
                      })
                      .catch(function (error) {
                        console.log(error);
                      });
                  }
                  setTimeout(() => {
                    self.taxData = self.taxData.sort(function (a, b) {
                      return a.orderby - b.orderby;
                    })
                    if (self.taxData) {
                      self.taxData.forEach(row => {
                        if (row.report) {
                          self.$refs.multipleTable.toggleRowSelection(row);
                        }
                      });
                    } else {
                      self.$refs.multipleTable.clearSelection();
                    }
                  })
                }

                //console.log(self.taxData)
              })
              .catch(function (error) {
                console.log(error);
              });
          }
        }
        //取票tab项
        this.countAtive = currentMonth + 1;
        this.active = currentMonth + 1;
        this.activeTax = currentMonth + 1;

        var self = this;
        var get_token = sessionStorage.getItem('token');
        var instance4 = this.$axios.create({
          headers: {'Content-Type': 'application/json', 'x-access-token': get_token}
        });
        instance4.get(process.env.API_HOST + 'process/status/' + this.customerId + '?date=' + this.currentYear)
          .then(function (response) {
            //console.log(response);
            if (response.data.success) {
              self.months = response.data.data;
              self.doneStatus=response.data.status;
              self.months.sort((a, b) => {
                return a.period - b.period;
              })
              self.taxFn(self.currentYear, currentMonth);
              self.billFn();

              var doneSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAACgElEQVRYR7VXy3XTQBS9zwucHUoFmAoYbcBekVSAqQCoAHdA0oHpIKkgogLCyoGNxhUkdBDvMOfgy3ljScj6jmQxSx3N3Pvu+ws6HPPdzEG8ATABEAjE6HWCFsAjgAcAkZ3aL77PStuPZmUmEHwCMBdI0PZ/QkjJRCAu7cwqqdpTS8DEJsBvfASx8AUuohB8hGCJJ/hsQ6ukSqeSgAPf4msqsY/VTf84F41xXkWiRMD8MAY7B+4lty85p8YI5/al1XjJzgGBxPL7ocFTNEdijOd5JTICQ8tep0zRHf8IrMyFiGi0D3uInxA8yz9KUrPjQr85AkmqxUNLT/IDThDJVm4BvDhwBRFqiqYErkTk3ZCmK7id2StnYGyCEgny2s7se0cgvAs1R58ORSAPnr6pKovIfV4FO7WnouVVKDf/FbymrlD4VszKDCZ/peUNRY3ktRK4FZHXVQpotIrIwsc9XcEVj+Q3Ce9CrUxZhGY+SoJIK6PsXBTXxkgfcEcAtEqAReuLDzaR6AueYnoRcKlUocSx4K4Qtbkgr06exBDgANZtQZgVkyyftVv+gUmLTPa9Rwt3QdiWhlWWFmOmbyPbp6FHIWoi0RfcZYEWIt9SPJDP8+Jt4mkcdGpGxQZzzNim8mfNKGkUWpBaG1LaYo8BB7AhqYG8b8fJTOA9kBB8EIjuBr1OaSCp69m9Xm+/tOaYZ+lcWBpKZSu6SLS6oh2n8o8Nx5xUDqX5QtPWfHqDj3jWOJbnq1pxhOoJml47kD3/VvNq9gsL33mghqBG+xInWHZazQ4akC6ngGbIvENsKHCk93ovp1UWufV8ByWiA6aubukgsya5X89HiOwrq+Be5y/2bbDB519G1QAAAABJRU5ErkJggg==";
              var notSrc = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAADa0lEQVRYR8VXTXLaUAyWnp11Ycw+9AR1ThBygpBdJmNPyQmanqDJCcoNQuM3mexKTlB6gjo3IHsYYI1tdfTwo8/w/EO6CEtGT/okffokI7zzD985PuwBWFxd+ZkQp0KIafvh4fl/AS4Gg1a6Xp8jYkskyXP76Wlq+iwAmAfBLSB+2xoQxZ6UJ28Fsbi87GZHR78AoJv7WBLA104UjbTPLYBZGA4Q4L4QjOiHJ+XgrQD43TwIRoD42fQh0vSk/fgY839bAPMgmALisZF9bfBFEPTAdeP2aLSsAjkPghgQP2kbAnjuRFG/CCAMqS44B8w22fDj1k61OKORrc/MgyxJJhoEAfzuRFGvAGAWhmMEOAdL2bmXqeveI6J61OA3Euv1nUm4HMRQtYPozpPytgAgN7j1pLwxA8yCoI+IzI1NxkQvADAmxKmTpjFk2TJ1XR8BfELsIcCpJhwQDT0p70x/THQdvADAllWBmEQrAhh0pBxXVUC1CYCJp/k08qLouuxNqRApPXAcHqEWk8ZxnEEd2XQQXU1A/JL/VwrCCkA5SNM/PL8mYRr0vmAyDwLuuQIhiM7aUk52fVgBGIRciSTxd9WrKZC8EjyCx0Q06Uh5Vgsgz36h+AZwbarW7mOeDhCipUXFBiwfXW6ltQp7FZiHIU/BdyB69aTUEmpNehaGqqR6pssqw3ZqOozx07Z7ALSxqVZVjpsA0Fyw8akUgA3tLpADKqD2TCMA81ySieiibuabAshHmqcKvCgqJG3jgNoJTQEg0QeBWFBPSNOVSUyTiLUAqghjacFmf1h+ZiCD2C+elL5pvl+B/ChpIkA8spAkBYfKeZJMTe0wSLhdw6VTYPRr6UVRu6noVNnpe8CmK1Yl3B4nlrk9FNC2/CxE6/XHyptQOze3oHk+HRo8vwmZ/a2ysS7dhgYZY+G6Z003oQnS8LESrtu1+Shfx5vzS2k4AExFml5Uab4ZWGXuuj8B0QeilciyXtnbyg+T/LgYA+IHFYCIr5nChbPblrznfNpz2VeEeFO10Gq/jPIPFT4oNyA2IjVBxJiyLHYcZ5llmU8APeSM/51uryLL+nVVqwXAAfO9zmp3YwKxkpJoBQBD4brDJrxpBEAHUp9ZadpHIl7TXULcrmskigmAj47Km3EX9EEADh3DJvbvDuAvomEDP5bfdf8AAAAASUVORK5CYII=";
              if(response.data.status.acc){
                self.accImg = doneSrc;
              }else{
                self.accImg = notSrc;
              }
              if(response.data.status.bill){
                self.billImg = doneSrc;
              }else{
                self.billImg = notSrc;
              }
              if(response.data.status.tax){
                self.taxImg = doneSrc;
              }else{
                self.taxImg = notSrc;
              }
              if(response.data.status.pay){
                self.payImg = doneSrc;
              }else{
                self.payImg = notSrc;
              }

              if (self.months[self.currentM - 1].acc) {
                self.accShow = true;
              } else {
                self.accNotShow = true;
              }
            } else {
              self.billDisplay = false,
                self.accDisplay = false,
                self.taxDisplay = false,
                self.payDisplay = false,
                self.yearDisplay = false,
                self.receiveDisplay = false;
              self.activeName2 = 'fourth';
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      } else {
        this.$router.push({path: '/loginView'})
      }
    }
  };
</script>
<style>
  html {
    font-size: 94%;
  }

  .el-table .notShould {
    background: #c9e5f5;
  }

  .el-table .should {
    background: #e2f0e4;
  }

  .detail {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    overflow: auto;
    background: rgba(7, 17, 27, 0.7);
  }

  /*.customerDetails .detail-wr{*/
  /*!important;*/
  /*}*/
  .customerDetails .showMoreOrLess {
    margin-top: 50px;
    width: 90px;
    position: relative;
    right: 50px;
  }

  .customerDetails .contractLeft {
    padding: 19px;
    width: 26%;
    border: 1px solid #ccc;
    float: left;
    margin-top: 20px;
  }

  .customerDetails .contractLeft .bg {
    box-shadow: 0px 0px 4px skyblue;
  }

  .customerDetails .fl {
    float: left;
  }

  .customerDetails .fr {
    float: right;
  }

  .customerDetails .contractLeft .box-card {
    margin-bottom: 20px;
  }

  .customerDetails .contractLeft .box-card:last-child {
    margin-bottom: 0;
  }

  .customerDetails .head {
    width: 97%;
    margin-bottom: 20px;
    background-color: #F2F2F2;
    overflow: hidden;
    height: auto;
    padding: 20px 30px;
    -webkit-box-sizing: border-box;
    border-radius: 8px;
  }

  .customerDetails .serviceTask div:last-of-type {
    border-bottom: 1px solid #ccc;
  }

  .customerDetails .title {
    font-size: 20px;
    margin-bottom: 30px;
  }

  .customerDetails .status-detail {
    color: forestgreen;
  }

  .customerDetails .page {
    width: 100%;
    margin: 150px 0 100px 0;
    border-top: 1px solid #ccc;
  }

  .customerDetails .page1 {
    border-top: 1px solid #ccc;
  }

  .customerDetails .contractLineH {
    line-height: 35px;
  }

  .customerDetails .content {
    width: 88%;
    margin-left: 80px;
  }

  .customerDetails .option {
    overflow: hidden;
  }

  .customerDetails .basicInfo {
    margin-bottom: 20px;
    margin-left: 35px;
  }

  .customerDetails .option p {
    float: left;
  }

  .customerDetails .option .op-right {
    float: right;
  }

  .customerDetails td, th {
    padding: 4px 6px;
  }

  .customerDetails .nopad td {
    padding: 0;
  }

  /*伪类选择器每一行里双数的td*/
  .customerDetails table tr td:nth-child(2n-1) {
    color: #999;
  }

  .customerDetails .info {
    margin-bottom: 10px;
  }

  .customerDetails .info-btn {
    margin-left: 110px;
    margin-bottom: 50px;
  }

  .customerDetails .unfinish {
    color: orange !important;
  }

  .page-log {
    border-top: 1px solid #ccc;
    margin-top: 100px;
  }

  .is-exist-log {
    margin-top: -10px;
    margin-left: -60px;
    margin-bottom: 10px;
    color: #ff4949;
    font-size: 12px;
  }

  .el-button {
    width: 88px;
  }

  .item-month div {
    float: left;
  }

  .item-month div div {
    margin-right: 10px;
    font-size: 10px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    text-align: center;
    line-height: 20px;
  }

  .item-c-month div {
    float: left;
  }

  .item-c-month div a {
    display: inline-block;
    border: 1px solid #ccc;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    text-align: center;
    line-height: 40px;
    margin-right: 20px;
  }

  .item-c-month div div {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    text-align: center;
    line-height: 40px;
    margin-right: 20px;
  }

  .item-c-month div a:hover {
    background: red;
    color: #fff;
  }

  .el-tabs__item {
    padding: 0 20px;
    margin-right: 10px;
  }

  .c-bill-done {
    clear: both;
    width: 85%;
    min-height: 200px;
    margin-top: 50px;
    float: left;
    background: #fff;
  }

  .tax-list {
    clear: both;
    width: 85%;
    min-height: 200px;
    background: #fff;
  }

  .addbtn {
    margin-top: -25px;
    margin-left: 14%;
    margin-bottom: 25px;
  }

  .tab-tax {
    position: relative;
  }

  .isTax {
    position: absolute;
    right: 230px;
    top: 12px;
    z-index: 3;
    font-weight: 600;
    font-size: 12px;
  }

  .grey {
    color: #ccc;
    background: #FBFDFF;
  }

  .light {
    color: #CCCFD7;
    background: #EBEEF1;
  }

  .orange {
    background: orange;
    color: #000;
  }

  .green {
    background: limegreen;
    color: #000;
  }

  .red {
    color: #fff;
  }

  .top {
    margin-top: -20px !important;
  }

  .disclick {
    color: #ddd;
  }

  .mask {
    left: 0;
    top: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background: #000;
    z-index: 100;
    opacity: 0.5;
  }
</style>
