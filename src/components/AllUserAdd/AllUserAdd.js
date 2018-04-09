import React, { Component }  from 'react';
import $ from 'jquery';
import {Link} from 'react-router-dom';
import { Form, Input,Steps, Button, message,Upload,Icon,Select,InputNumber,Radio  } from 'antd';
import request from '../../utils/request';

const FormItem = Form.Item;

class About extends Component{
  componentDidMount() {

  };
  /*提交表单*/
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      lrz(values.avatarurl[0].thumbUrl,{quality:1}).then((rst)=> {
        var avatarurl = rst.base64.split(',')[1];
        let formData = new FormData();
        formData.append("username", values.username);
        formData.append("password", values.password);
        formData.append("avatarurl",avatarurl);
        request('/api/user/InsertUser',{
          method:'POST',
          body:formData,
        }).then((data)=>{
          console.log(data)
          if(data.data.code==='1') {
            this.props.history.push('/admin/AllUser');
            message.success('添加成功');
          }else{
            message.success(data.data.message);
          }
        })
      })
    })
  }
  /*返回上一页*/
  handleBack = (e) => {
    console.log('返回')
    this.props.history.push('/admin/AllUser');
  }
  /*上传管理员头像*/
  normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  render(){
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };
    return (
      <div style={{width:'95%',margin:'20px auto'}}>
        <Button className="editable-add-btn" onClick={this.handleBack} style={{marginBottom:'10px'}}>返回</Button>

        <Form onSubmit={this.handleSubmit} style={{width:'40%',margin:'0 auto'}}>
          <FormItem
            {...formItemLayout}
            label="管理员姓名"
          >
            {getFieldDecorator('username', {
              rules: [{
                required: true, message: '请输入新管理员的姓名',
              }],
            })(
              <Input />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="管理员密码"
          >
            {getFieldDecorator('password', {
              rules: [{
                required: true,message: '请输入新管理员的密码',
              }],
            })(
              <Input/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="管理员头像">
            {getFieldDecorator('avatarurl', {
              valuePropName: 'fileList',
              getValueFromEvent: this.normFile,
              rules: [
                { required: true, message: '请上传管理员头像',},
              ],
            })(
              <Upload name="logo" listType="picture">
                <Button>
                  <Icon type="upload" />Click to upload
                </Button>
              </Upload>
            )}
          </FormItem>
          <Button style={{width:'30%',margin:'3% 25%'}} type="primary" htmlType="submit">完成</Button>
        </Form>
      </div>
    );
  }
};
const AboutAdd = Form.create()(About);
export default AboutAdd;
