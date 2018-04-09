import React, { Component } from 'react';
import { Form,Table, Input, Icon, Button,Modal,Upload,message,Popconfirm } from 'antd';
import {HashRouter as Router, Route, Link,Switch  } from 'react-router-dom';
import styles from './AllUserDemand.css';
import $ from 'jquery';
import lrz from 'lrz';
import request from '../../utils/request';
const FormItem = Form.Item;

const data = [];

const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable
      ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
      : value
    }
  </div>
);

class AllhomeModule extends React.Component {
  componentWillMount = () =>{
    console.log('用户表')
    this.firstRefresh()
    this.setState({
      uploadhidden:false,
      successhidden:true,
      tableloading:true,
    })
  }
  firstRefresh = () =>{
    request('/api/demand/firstRefresh',{
      method:'POST',
    }).then((data)=>{
      console.log('请求接口成功')
      console.log(data)
      console.log(data.data.code)
      if(data.data.code==='1'){
        this.setState({
          data : data.data.message,
          tableloading:false,
        })
      }
    })
  }
  constructor(props) {
    super(props);
    this.columns = [{
      title: '需求状态',
      dataIndex: 'demandState',
      render: (text, record) => {
      const { editable } = record;
      return (
        <div className="editable-row-operations">
          {
            record.demandState=='待处理'
              &&
            <p style={{color:'#FF7800'}}>{record.demandState}</p>
          }{
          record.demandState=='已处理'
          &&
          <p style={{color:'#43D1D6'}}>{record.demandState}</p>
        }
        </div>
      );
    },
    },{
      title: '发布人姓名',
      dataIndex: 'demandCreateUser',
      render: (text, record) => this.renderColumns(text, record, 'demandCreateUser'),
    },{
      title: '需求时间',
      dataIndex: 'demandDate',
      render: (text, record) => this.renderColumns(text, record, 'demandDate'),
    },{
      title: '需求人姓名',
      dataIndex: 'demandUser',
      render: (text, record) => this.renderColumns(text, record, 'demandUser'),
    }, {
      title: '需求人手机号',
      dataIndex: 'demandTel',
      render: (text, record) => this.renderColumns(text, record, 'demandTel'),
    },{
      title: '需求城市',
      dataIndex: 'demandCity',
      render: (text, record) => this.renderColumns(text, record, 'demandCity'),
    },{
      title: '需求说明',
      dataIndex: 'demandText',
      render: (text, record) => this.renderColumns(text, record, 'demandText'),
    },{
      title: '操作',
      dataIndex: '操作',
      render: (text, record) => {
        const { editable } = record;
        return (
          <div className="editable-row-operations">
            {
              <p>
                <Popconfirm title="确定删除?" onConfirm={() => this.delete(record.demandId)}>
                  <a>删除</a>
                </Popconfirm>
              </p>
            }
          </div>
        );
      },
    }];
    this.state = { data };
    this.cacheData = data.map(item => ({ ...item }));
  }
  renderColumns(text, record, column) {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value => this.handleChange(value, record.key, column)}
      />
    );
  }
  handleChange(value, key, column) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target[column] = value;
      this.setState({ data: newData });
    }
  }
  delete(key) {
    this.setState({
      tableloading:true
    })
    console.log(key)
    let datas = new FormData();
    datas.append("uid",key)
    request('/api/User/deleteUser',{
      method:'POST',
      body:datas,
    }).then((data)=>{
      console.log('请求接口成功')
      console.log(data)
      console.log(data.data.code)
      if(data.data.code==='1'){
        this.setState({
          tableloading:false
        })
        this.firstRefresh()
        message.success('删除成功');
      }
    })
  }
  save(key) {
    console.log(key)
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      delete target.editable;
      this.setState({ data: newData });
      this.cacheData = newData.map(item => ({ ...item }));
    }
  }
  cancel(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
      delete target.editable;
      this.setState({ data: newData });
    }
  }
  /*添加模块*/
  handleAdd = (e) => {
    this.props.history.push('/admin/AllUser/AllUserAdd');
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{width:'95%',margin:'20px auto'}}>
        <Button className="editable-add-btn" onClick={this.handleAdd} style={{marginBottom:'10px'}}>添加管理员</Button>
        <Table rowKey="uid"  loading={this.state.tableloading} bordered dataSource={this.state.data} columns={this.columns} />
      </div>
    );
  }
}
const Allhome = Form.create()(AllhomeModule);
export default Allhome;
