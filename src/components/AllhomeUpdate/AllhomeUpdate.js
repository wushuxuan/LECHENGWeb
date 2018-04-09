import React, { Component }  from 'react';
import $ from 'jquery';
import { Form, Input,Steps, Button, message,Upload,Icon,Select,InputNumber,Radio  } from 'antd';
import styles from './AllhomeUpdate.css';
import request from '../../utils/request';
const Step = Steps.Step;
const FormItem = Form.Item;
const { TextArea } = Input;
const Option = Select.Option;
const RadioGroup = Radio.Group;


const steps = [{
  title: '房主信息',
}, {
  title: '房间信息',
}, {
  title: '房间照片',
}];


class AllHomeAdd extends Component{

  componentDidMount(key) {
    console.log('AllhomeAdd 页面')
    var Allhomeid = window.location.href.split('?')[1].split('=')[1];
    console.log(Allhomeid)
    let datas = new FormData();
    datas.append('Allhomeid',Allhomeid)
    request('/api/Allhome/AllhomeAll',{
      method:"POST",
      body:datas,
    }).then((res)=>{
      console.log(res)
      this.setState({
        newarr : res
      })
      if(res.data.code==='1'){
          this.setState({
            AllhomeOwner:res.data.message[0].AllhomeOwner,
            AllhomeTel:res.data.message[0].AllhomeTel,
            AllhomeTitle:res.data.message[0].AllhomeTitle,
            AllhomeCity:res.data.message[0].AllhomeCity,
            AllhomePrice:res.data.message[0].AllhomePrice,
            AllhomeArea:res.data.message[0].AllhomeArea,
            AllhomeAddress:res.data.message[0].AllhomeAddress,
            AllhomeBelong:res.data.message[0].AllhomeBelong,
            AllhomeDes:res.data.message[0].AllhomeDes,
            AllhomeLayernum:res.data.message[0].AllhomeLayernum,
            AllhomeShortdate:res.data.message[0].AllhomeShortdate,
            IsFirstrent:res.data.message[0].IsFirstrent,
            IsHardcover:res.data.message[0].IsHardcover,
            IsHasair:res.data.message[0].IsHasair,
            IsIndependent:res.data.message[0].IsIndependent,
            IsNearsubway:res.data.message[0].IsNearsubway,
            IsSouth:res.data.message[0].IsSouth,
            AllhomeAva:res.data.message[0].AllhomeAva,
            AllhomeBedImg:res.data.message[0].AllhomeBedImg,
            AllhomeCoverImg:res.data.message[0].AllhomeCoverImg,
            AllhomeKitchenImg:res.data.message[0].AllhomeKitchenImg,
            AllhomeSittingImg:res.data.message[0].AllhomeSittingImg,
            AllhomeWashImg:res.data.message[0].AllhomeWashImg,
          })
      }
    })
    this.setState({
      one:false,
      two:true,
      three:true
    })
  };

  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }
  next() {
    console.log(this.state.newarr)
    console.log(this.state.newarr.data.message[0].AllhomeTitle)
    this.setState({
      AllhomeTitle:this.state.newarr.data.message[0].AllhomeTitle
    })
    const current = this.state.current + 1;
    this.setState({ current });
    console.log(current)
    if(current===0){
      this.setState({
        one:false,
        two:true,
        three:true
      })
    }else if(current===1){
      this.setState({
        one:true,
        two:false,
        three:true
      })
    }else{
      this.setState({
        one:true,
        two:true,
        three:false
      })
    }
  }
  prev() {
    const current = this.state.current - 1;
    this.setState({ current });
    console.log(current)
    if(current===0){
      this.setState({
        one:false,
        two:true,
        three:true
      })
    }else if(current===1){
      this.setState({
        one:true,
        two:false,
        three:true
      })
    }else{
      this.setState({
        one:true,
        two:true,
        three:false
      })
    }
  }
  stepChange = (e) =>{
    console.log(e)
  }
  /*提交表单*/
  handleSubmit = (e) => {
    e.preventDefault();
    console.log('提交表单')
    this.props.form.validateFields((err, values) => {
      if (!err) {
        lrz(values.AllhomeAva[0].thumbUrl,{quality:1}).then((rst)=>{
          var AllhomeAva = rst.base64.split(',')[1];
          lrz(values.AllhomeBedImg[0].thumbUrl,{quality:1}).then((rst)=>{
             var AllhomeBedImg = rst.base64.split(',')[1];
            lrz(values.AllhomeCoverImg[0].thumbUrl,{quality:1}).then((rst)=>{
              var AllhomeCoverImg = rst.base64.split(',')[1];
                lrz(values.AllhomeKitchenImg[0].thumbUrl,{quality:1}).then((rst)=>{
                  var AllhomeKitchenImg = rst.base64.split(',')[1];
                  lrz(values.AllhomeSittingImg[0].thumbUrl,{quality:1}).then((rst)=>{
                    var AllhomeSittingImg = rst.base64.split(',')[1];
                    lrz(values.AllhomeWashImg[0].thumbUrl,{quality:1}).then((rst)=>{
                      var AllhomeWashImg = rst.base64.split(',')[1];

                      let formData = new FormData();
                      formData.append("AllhomeAddress",values.AllhomeAddress);
                      formData.append("AllhomeArea",values.AllhomeArea);
                      formData.append("AllhomeBelong",values.AllhomeBelong);
                      formData.append("AllhomeCity",values.AllhomeCity);
                      formData.append("AllhomeDes",values.AllhomeDes);
                      formData.append("AllhomeLayernum",values.AllhomeLayernum);
                      formData.append("AllhomeOwner",values.AllhomeOwner);
                      formData.append("AllhomePrice",values.AllhomePrice);
                      formData.append("AllhomeShortdate",values.AllhomeShortdate);
                      formData.append("AllhomeTel",values.AllhomeTel);
                      formData.append("AllhomeTitle",values.AllhomeTitle);
                      formData.append("IsFirstrent",values.IsFirstrent);
                      formData.append("IsHardcover",values.IsHardcover);
                      formData.append("IsHasair",values.IsHasair);
                      formData.append("IsIndependent",values.IsIndependent);
                      formData.append("IsNearsubway",values.IsNearsubway);
                      formData.append("IsSouth",values.IsSouth);
                      formData.append("AllhomeAva",AllhomeAva);
                      formData.append("AllhomeBedImg",AllhomeBedImg);
                      formData.append("AllhomeCoverImg",AllhomeCoverImg);
                      formData.append("AllhomeKitchenImg",AllhomeKitchenImg);
                      formData.append("AllhomeSittingImg",AllhomeSittingImg);
                      formData.append("AllhomeWashImg",AllhomeWashImg);
                      console.log('Received values of form: ', formData);
                      request('/api/allhome/InsertAllHome',{
                        method:'POST',
                        body:formData,
                      }).then((data)=>{
                        console.log(data)
                        if(data.data.code==='1') {
                          this.props.history.push('/admin/AllHome');
                        }
                      })
                    })
                  })
                })
            })
          })
        })
      }
    });
  }
  /*上传房主头像*/
  normFile = (e) => {
    console.log('Upload event:', e);
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  }
  /*返回上一页*/
  handleAdd = (e) => {
    console.log('返回')
    this.props.history.push('/admin/AllHome');
  }
  /*房屋价格*/
  PriceChange = (value) => {
    console.log('changed', value);
  }
  /*房屋面积*/
  AreaChange = (value) => {
    console.log('changed', value);
  }
  /*房间是否独立*/
  ChooseIndependent = (e) => {
    console.log('IsIndependent:', e.target.value);
    this.setState({
      IsIndependent: e.target.value,
    });
  }
  /*房间是否首次出租*/
  ChooseFirstrent = (e) => {
    console.log('IsFirstrent:', e.target.value);
    this.setState({
      IsFirstrent: e.target.value,
    });
  }
  /*房间是否有空调 */
  ChooseHasair = (e) => {
    console.log('IsHasair:', e.target.value);
    this.setState({
      IsHasair: e.target.value,
    });
  }
  /*房间是否朝南 */
  ChooseSouth = (e) => {
    console.log('IsSouth:', e.target.value);
    this.setState({
      IsSouth: e.target.value,
    });
  }
  /*房间是否精装修 */
  ChooseHardcover = (e) => {
    console.log('IsHardcover:', e.target.value);
    this.setState({
      IsHardcover: e.target.value,
    });
  }
  /*房间是否离地铁近*/
  ChooseNearsubway = (e) => {
    console.log('IsNearsubway:', e.target.value);
    this.setState({
      IsNearsubway: e.target.value,
    });
  }
  /*房间是否离地铁近*/
  ChooseNearsubway = (e) => {
    console.log('IsNearsubway:', e.target.value);
    this.setState({
      IsNearsubway: e.target.value,
    });
  }
  /*选择房屋所属城市*/
  ChangeCity = (value) => {
    console.log('selected:'+value);
  }

  handleBlur = () => {
    console.log('blur');
  }

  handleFocus = () => {
    console.log('focus');
  }
  render() {
    const { current } = this.state;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    return (
      <div style={{width:'95%',margin:'20px auto'}}>
        <Button className="editable-add-btn" onClick={this.handleAdd} style={{marginBottom:'10px'}}>返回</Button>
        <Steps className={styles.Steps} current={current}>
          {steps.map(item => <Step key={item.title} title={item.title} />)}
        </Steps>
        <Form onSubmit={this.handleSubmit}>
        <div className="steps-content" style={{width:'50%',margin:'30px  auto'}}>
            <div hidden={this.state.one}>
              <FormItem
                  {...formItemLayout}
                  label="房主姓名"
                >
                  {getFieldDecorator('AllhomeOwner', {
                    initialValue: this.state.AllhomeOwner,
                    rules: [{required: true, message: '请输入房主的姓名!',}],
                  })(
                    <Input/>
                  )}
                </FormItem>
                <FormItem
                  {...formItemLayout}
                  label="房主联系电话"
                >
                  {getFieldDecorator('AllhomeTel', {
                    initialValue: this.state.AllhomeTel,
                    rules: [{
                      required: true, message: '请输入房主的电话!',
                    }],
                  })(
                    <Input/>
                  )}
                </FormItem>
              <FormItem
                {...formItemLayout}
                label="房主头像">
                {getFieldDecorator('AllhomeAva', {
                  valuePropName: 'fileList',
                  getValueFromEvent: this.normFile,
                  setFieldsValue:this.state.AllhomeAva,
                  rules: [
                    { required: true, message: '请上传房主头像',},
                  ],
                })(
                  <Upload setFieldsValue={this.state.AllhomeAva} name="logo" listType="picture">
                    <Button>
                      <Icon type="upload" />Click to upload
                    </Button>
                    <div className={styles.imgBorder}>
                      <img src={this.state.AllhomeAva}/>
                    </div>
                  </Upload>
                )}
              </FormItem>
            </div>
          <div hidden={this.state.two}>
            <FormItem
              {...formItemLayout}
              label="房屋标题"
            >
              {getFieldDecorator('AllhomeTitle', {
                initialValue: this.state.AllhomeTitle,
                rules: [{
                  required: true, message: '请输入房屋标题!',
                }],
              })(
                <Input  placeholder="请输入房屋标题"/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="房屋所属城市"
            >
              {getFieldDecorator('AllhomeCity', {
                initialValue: this.state.AllhomeCity,
                rules: [{
                  required: true, message: '请选择房屋所属城市!',
                }],
              })(
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="请选择房屋所属城市"
                  optionFilterProp="children"
                  onChange={()=>this.ChangeCity()}
                  onFocus={()=>this.handleFocus()}
                  onBlur={()=>this.handleBlur()}
                  filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  <Option value="上海">上海</Option>
                  <Option value="北京">北京</Option>
                  <Option value="深圳">深圳</Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="房屋价格（ 月 ）"
            >
              {getFieldDecorator('AllhomePrice', {
                initialValue: this.state.AllhomePrice,
                rules: [{
                  required: true, message: '请输入房屋价格（ 月 ）!',
                }],
              })(
                <InputNumber
                  InitialValue={1000}
                  formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  onChange={()=>this.PriceChange()}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="房屋所占面积"
            >
              {getFieldDecorator('AllhomeArea', {
                initialValue: this.state.AllhomeArea,
                rules: [{
                  required: true, message: '请输入房屋所占面积!',
                }],
              })(
                <InputNumber
                  formatter={value => `${value} 平方米`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  onChange={()=>this.PriceChange()}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="房屋位于楼层数"
            >
              {getFieldDecorator('AllhomeLayernum', {
                initialValue: this.state.AllhomeLayernum,
                rules: [{
                  required: true, message: '请输入房屋位于楼层数!',
                }],
              })(
                <InputNumber
                  InitialValue={1000}
                  formatter={value => `${value} 层`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={value => value.replace(/\$\s?|(,*)/g, '')}
                  onChange={()=>this.PriceChange()}
                />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="房间是否独立"
            >
              {getFieldDecorator('IsIndependent', {
                initialValue: this.state.IsIndependent,
                rules: [{
                  required: true, message: '请选择房间是否独立!',
                }],
              })(
                <RadioGroup onChange={this.ChooseIndependent} >
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="房间是否首次出租"
            >
              {getFieldDecorator('IsFirstrent', {
                initialValue: this.state.IsFirstrent,
                rules: [{
                  required: true, message: '请选择房间是否首次出租!',
                }],
              })(
                <RadioGroup onChange={this.ChooseFirstrent}>
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="房间是否有空调"
            >
              {getFieldDecorator('IsHasair', {
                initialValue: this.state.IsHasair,
                rules: [{
                  required: true, message: '请选择房间是否有空调!',
                }],
              })(
                <RadioGroup onChange={this.ChooseHasair}>
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="房间是否朝南"
            >
              {getFieldDecorator('IsSouth', {
                initialValue: this.state.IsSouth,
                rules: [{
                  required: true, message: '请选择房间是否朝南!',
                }],
              })(
                <RadioGroup onChange={this.ChooseSouth}>
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="房间是否精装修 "
            >
              {getFieldDecorator('IsHardcover', {
                initialValue: this.state.IsHardcover,
                rules: [{
                  required: true, message: '请选择房间是否精装修!',
                }],
              })(
                <RadioGroup onChange={this.ChooseHardcover}>
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="房间是否离地铁近 "
            >
              {getFieldDecorator('IsNearsubway', {
                initialValue: this.state.IsNearsubway,
                rules: [{
                  required: true, message: '请选择房间是否离地铁近!',
                }],
              })(
                <RadioGroup onChange={this.ChooseNearsubway}>
                  <Radio value={1}>是</Radio>
                  <Radio value={0}>否</Radio>
                </RadioGroup>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="房屋最短租期"
            >
              {getFieldDecorator('AllhomeShortdate', {
                initialValue: this.state.AllhomeShortdate,
                rules: [{
                  required: true, message: '请选择房屋最短租期!',
                }],
              })(
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="请选择房屋最短租期!"
                >
                  <Option value="按天">按天</Option>
                  <Option value="按月">按月</Option>
                  <Option value="按季度">按季度</Option>
                  <Option value="按年">按年</Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="房间分类"
            >
              {getFieldDecorator('AllhomeBelong', {
                initialValue: this.state.AllhomeBelong,
                rules: [{
                  required: true, message: '请选择房间分类!',
                }],
              })(
                <Select
                  showSearch
                  style={{ width: 200 }}
                  placeholder="请选择房间分类!"
                >
                  <Option value="1">经济房</Option>
                  <Option value="2">小资房</Option>
                  <Option value="3">双人房</Option>
                  <Option value="4">长租房</Option>
                  <Option value="5">短租房</Option>
                </Select>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="房屋具体位置"
            >
              {getFieldDecorator('AllhomeAddress', {
                initialValue: this.state.AllhomeAddress,
                rules: [{
                  required: true, message: '请输入房屋具体位置!',
                }],
              })(
                <Input  placeholder="请输入房屋具体位置"/>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="房屋描述"
            >
              {getFieldDecorator('AllhomeDes', {
                initialValue: this.state.AllhomeDes,
                rules: [{
                  required: true, message: '房屋描述!',
                }],
              })(
                <TextArea rows={4} />
              )}
            </FormItem>
          </div>
          <div hidden={this.state.three}>
            <FormItem
              {...formItemLayout}
              label="房屋封面图片">
              {getFieldDecorator('AllhomeCoverImg', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
                rules: [
                  { required: true, message: '请上传房屋封面图片',},
                ],
              })(
                <Upload name="logo" listType="picture">
                  <Button>
                    <Icon type="upload" />Click to upload
                  </Button>
                  <div className={styles.imgBorder}>
                    <img src={this.state.AllhomeCoverImg}/>
                  </div>
                </Upload>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="房屋客厅图片">
              {getFieldDecorator('AllhomeSittingImg', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
                rules: [
                  { required: true, message: '请上传房屋客厅图片',},
                ],
              })(
                <Upload name="logo" listType="picture">
                  <Button>
                    <Icon type="upload" />Click to upload
                  </Button>
                  <div className={styles.imgBorder}>
                    <img src={this.state.AllhomeSittingImg}/>
                  </div>
                </Upload>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="房屋厨房图片">
              {getFieldDecorator('AllhomeKitchenImg', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
                rules: [
                  { required: true, message: '请上传房屋厨房图片',},
                ],
              })(
                <Upload name="logo" listType="picture">
                  <Button>
                    <Icon type="upload" />Click to upload
                  </Button>
                  <div className={styles.imgBorder}>
                    <img src={this.state.AllhomeKitchenImg}/>
                  </div>
                </Upload>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="房屋卫生间图片">
              {getFieldDecorator('AllhomeWashImg', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
                rules: [
                  { required: true, message: '请上传房屋卫生间图片',},
                ],
              })(
                <Upload name="logo" listType="picture">
                  <Button>
                    <Icon type="upload" />Click to upload
                  </Button>
                  <div className={styles.imgBorder}>
                    <img src={this.state.AllhomeWashImg}/>
                  </div>
                </Upload>
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="房屋卧室图片">
              {getFieldDecorator('AllhomeBedImg', {
                valuePropName: 'fileList',
                getValueFromEvent: this.normFile,
                rules: [
                  { required: true, message: '请上传房屋卧室图片',},
                ],
              })(
                <Upload name="logo" listType="picture">
                  <Button>
                    <Icon type="upload" />Click to upload
                  </Button>
                  <div className={styles.imgBorder}>
                    <img src={this.state.AllhomeBedImg}/>
                  </div>
                </Upload>
              )}
            </FormItem>
          </div>
        </div>
        <div className="steps-action" style={{width:'60%',margin:'30px  auto',textAlign:'right'}}>
          {
            this.state.current < steps.length - 1
            &&
            <Button type="primary" onClick={() => this.next()}>下一步</Button>
          }
          {
            this.state.current === steps.length - 1
            &&
            <Button type="primary" htmlType="submit">完成</Button>
          }
          {
            this.state.current > 0
            &&
            <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
              上一步
            </Button>
          }
        </div>
      </Form>
      </div>
    );
  }
};
const AllhomeAdd = Form.create()(AllHomeAdd);
export default AllhomeAdd;
