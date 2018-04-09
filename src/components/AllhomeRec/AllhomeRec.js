import React, { Component } from 'react';
import { Form,Table, Input, Icon, Button,Modal,Upload,message,Popconfirm } from 'antd';
import {HashRouter as Router, Route, Link,Switch  } from 'react-router-dom';
import styles from './AllhomeRec.css';
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
    this.firstRefresh()
    this.setState({
      uploadhidden:false,
      successhidden:true,
      tableloading:true,
    })
  }
  firstRefresh = () =>{
    request('/api/allhome/RecfirstRefresh',{
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
      title: '房屋标题',
      dataIndex: 'AllhomeTitle',
      rowkey:'AllhomeTitle',
      render: (text, record) => this.renderColumns(text, record, 'AllhomeTitle'),
    },{
      title: '房主姓名',
      dataIndex: 'AllhomeOwner',
      width:'100px',
      render: (text, record) => this.renderColumns(text, record, 'AllhomeOwner'),
    },{
      title: '房主联系方式',
      dataIndex: 'AllhomeTel',
      width:'140px',
      render: (text, record) => this.renderColumns(text, record, 'AllhomeTel'),
    }, {
      title: '房屋描述',
      dataIndex: 'AllhomeDes',
      key:'AllhomeDes',
      width:'140px',
      render: (text, record) => this.renderColumns(text, record, 'AllhomeDes'),
    }, {
      title: '房屋封面图片',
      dataIndex: 'AllhomeCoverImg',
      width:'140px',
      render:(text,record)=>(<img style={{width:'100px',height:'60px'}} src={record.AllhomeCoverImg}/>)
    },{
      title: '房屋发布时间',
      dataIndex: 'AllhomeTime',
      width:'140px',
    }, {
      title: '房屋状态',
      dataIndex: 'AllhomeState',
      width:'10%',
      render: (text, record) => this.renderColumns(text, record, 'AllhomeState'),
    },{
      title: '操作',
      dataIndex: 'operation',
      width:'13%',
      render: (text, record) => {
        const { editable } = record;
        return (
          <div className="editable-row-operations">
            {
              <p>
                <a onClick={() => this.edit(record.Allhomeid)}>查看</a>
                <Popconfirm title="确定删除?" onConfirm={() => this.delete(record.Allhomeid)}>
                  <a style={{display:'inline-block',marginLeft:'10px'}}>删除</a>
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
  edit(key) {
    console.log('查看id:'+key)
    this.props.history.push('/admin/AllHome/AllhomeUpdate?Allhomeid='+key);
  }
  delete(key) {
    this.setState({
      tableloading:true
    })
    console.log(key)
    let datas = new FormData();
    datas.append("Allhomeid",key)
    request('/api/Allhome/deleteAllhome',{
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
    this.props.history.push('/admin/AllHome/AllHomeAdd');
  }

  /*上传图片*/
  normFile = (e) => {
    if(e.fileList[0].thumbUrl!=='undefined' && !e.fileList[0].thumbUrl){
      console.log('base64位的url路径')
      console.log(e.fileList[0].thumbUrl)
      console.log('******')
      this.setState({
        imageUrl:e.fileList[0].thumbUrl,
        uploadhidden:true,
        successhidden:false
      })
    }else{
      console.log('+++')
      this.setState({
        imageUrl:e.fileList[0].thumbUrl,
        uploadhidden:false,
        successhidden:true
      })
    }
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={{width:'95%',margin:'20px auto'}}>
        <Button className="editable-add-btn" onClick={this.handleAdd} style={{marginBottom:'10px'}}>添加</Button>
        <Table rowKey="AllhomeTitle"  loading={this.state.tableloading} bordered dataSource={this.state.data} columns={this.columns} />
      </div>
    );
  }
}
const Allhome = Form.create()(AllhomeModule);
export default Allhome;
