import React, { Component } from 'react';
import { Form,Table, Input, Icon, Button,Modal,Upload,message,Popconfirm } from 'antd';
import styles from './ShufflingModule.css';
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

class ShufflingModule extends React.Component {
	componentWillMount = () =>{
		this.firstRefresh()
		this.setState({
			uploadhidden:false,
			successhidden:true,
			tableloading:true,
		})
    }
	firstRefresh = () =>{
		request('/api/swiper/firstRefresh',{
				method:'POST',
			}).then((data)=>{
				this.setState({
						tableloading:false,
					})
				if(data.data.code==='1'){
					this.setState({
						data : data.data.message,
					})
				}
			})
	}
  constructor(props) {
    super(props);
    this.columns = [{
		title: '轮播标题',
		dataIndex: 'SwiperName',
		render: (text, record) => this.renderColumns(text, record, 'SwiperName'),
    }, {
      key:'2',
      title: '轮播链接地址',
	  dataIndex: 'SwiperUrl',
      render: (text, record) => this.renderColumns(text, record, 'SwiperUrl'),
    }, {
      title: '轮播图片',
	  dataIndex: 'SwiperImg',
	  width:'140px',
      render:(text,record)=>(<img style={{width:'100px',height:'60px'}} src={record.SwiperImg}/>)
    }, {
      title: '创建时间',
	  dataIndex: 'SwiperTime',
    }, {
	  title: '状态',
	  dataIndex: 'SwiperState',
	  width:'10%',
      render: (text, record) => this.renderColumns(text, record, 'SwiperState'),
    },{
      title: '操作',
      dataIndex: 'operation',
      width:'13%',
      render: (text, record) => {
        const { editable } = record;
        return (
          <div className="editable-row-operations">
            {
              editable ?
                <span>
                  <a onClick={() => this.save(record.Swiperid)}>Save</a>
                  <Popconfirm title="确定取消?" onConfirm={() => this.cancel(record.Swiperid)}>
                    <a style={{display:'inline-block',marginLeft:'10px'}}>Cancel</a>
                  </Popconfirm>
                </span>
                : <p>
                    <a onClick={() => this.edit(record.Swiperid)}>编辑</a>
                    <Popconfirm title="确定删除?" onConfirm={() => this.delete(record.Swiperid)}>
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
        onChange={value => this.handleChange(value, record.Swiperid, column)}
      />
    );
  }
  handleChange(value, key, column) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.Swiperid)[0];
    if (target) {
      target[column] = value;
      this.setState({ data: newData });
    }
  }
  edit(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.Swiperid)[0];
    if (target) {
      target.editable = true;
      this.setState({ data: newData });
    }
  }
  delete(key) {
	this.setState({
		tableloading:true
	})
	let datas = new FormData();
	datas.append("swiperId",key)
    request('/api/swiper/deleteSwiper',{
		method:'POST',
		body:datas,
	}).then((data)=>{
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
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.Swiperid)[0];
    if (target) {
      delete target.editable;
      this.setState({ data: newData });
      this.cacheData = newData.map(item => ({ ...item }));
    }
    if(target.SwiperState=='不显示'){
      var SwiperState = 0;
    }else{
      var SwiperState = 1;
    }
    let datas = new FormData();
    datas.append("SwiperName",target.SwiperName)
    datas.append("SwiperUrl",target.SwiperUrl)
    datas.append("SwiperState",SwiperState)
    datas.append("Swiperid",key)
    request('/api/swiper/updateSwiper',{
      method:'POST',
      body:datas,
    }).then((res)=>{
      //console.log(res)
    })
  }
  cancel(key) {
    const newData = [...this.state.data];
    const target = newData.filter(item => key === item.Swiperid)[0];
    if (target) {
      Object.assign(target, this.cacheData.filter(item => key === item.Swiperid)[0]);
      delete target.editable;
      this.setState({ data: newData });
    }
  }
  /*添加模块*/
    handleAdd = () => {
      this.setState({
        visible: true,
        loading:false
      });
    }
	handleOk = (e) => {
      this.props.form.validateFields((err, values) => {
          if (!err) {
            this.setState({
              visible: true,
              loading:true
            });
			if(!values.upload[0]){
				this.setState({
					visible: false,
				})
			}else{
				let formData = new FormData();
				formData.append("SwiperTitle", $("input[id='title']").val());
				formData.append("SwiperAddress", $("input[id='address']").val());
				formData.append("imageFile", values.upload[0].thumbUrl);
				request('/api/swiper/InsertSwiper',{
				method:'POST',
				body:formData,
				}).then((data)=>{
					if(data.data.code==='1'){
						this.firstRefresh()
						this.setState({
							visible: false,
						})
						message.success('添加成功');
					}
            })
			}
          }

        },
      );
    }
	handleCancel = (e) => {
      this.setState({
        visible: false,
        loading:false
      });
    }
    handleSubmit = (e) =>{
    }
    /*上传图片*/
	normFile = (e) => {
		if (Array.isArray(e)) {
		  return e;
		}
		return e && e.fileList;
	 }
  render() {
	const { getFieldDecorator } = this.props.form;
    return (
		<div>
		<div style={{width:'95%',margin:'20px auto'}}>
			<Button className="editable-add-btn" onClick={this.handleAdd} style={{marginBottom:'10px'}}>添加</Button>
			<Table rowKey="SwiperName" loading={this.state.tableloading} bordered dataSource={this.state.data} columns={this.columns} />
		</div>
		<div>
		  <Modal
			title="添加轮播"
			cancelText="取消"
			okText="添加"
			confirmLoading={this.state.loading}
			visible={this.state.visible}
			onOk={this.handleOk}
			onCancel={this.handleCancel}
		  >
			<Form onSubmit={this.handleSubmit}>
			  <FormItem className={styles.formitem}  label="轮播标题">
				{getFieldDecorator('title', {
				  rules: [
					{ required: true, message: '请输入轮播标题',},
				  ],
				})(
				  <Input id={"title"} className={styles.input} placeholder="请输入轮播标题" />
				)}
			  </FormItem>
			  <FormItem className={styles.formitem}  label="轮播地址">
				{getFieldDecorator('address', {
				  rules: [
					{ required: true, message: '请输入轮播链接地址',},
				  ],
				})(
				  <Input id={"address"} className={styles.input} placeholder="请输入轮播链接地址" />
				)}
			  </FormItem>
			  <FormItem className={styles.formitem} label="轮播图片">
				{getFieldDecorator('upload', {
				  valuePropName: 'fileList',
				  getValueFromEvent: this.normFile,
				  rules: [
					{ required: true, message: '请上传轮播图片',},
				  ],
				})(
				  <Upload name="logo" listType="picture">
					<Button>
					  <Icon hidden={this.state.uploadhidden} type="upload" />
					  <Icon hidden={this.state.successhidden}  style={{color:'#1890ff'}} type="check-circle-o" /> Click to upload
					</Button>
				  </Upload>
				)}
			  </FormItem>
			</Form>
		  </Modal>
		</div>
		</div>
	);
  }
}
const everything = Form.create()(ShufflingModule);
export default everything;
