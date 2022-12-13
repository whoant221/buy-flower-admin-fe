import { Button, DatePicker, Form, Input, Modal } from 'antd';
import React from 'react';

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

const PopupCreateVoucher = (props) => {
    const [form] = Form.useForm();
    const { isModalOpen, handleOk, handleCancel } = props

    const onFinishForm = (e) => {
        console.log(e);
        handleOk(e)
        form.resetFields();
    }

    return (
        <>
            <Modal title="Tạo voucher mới" open={isModalOpen}
                   onCancel={handleCancel} footer={null}>
                <Form labelCol={{ span: 6 }}
                      wrapperCol={{ span: 18 }}
                      form={form}
                      onFinish={onFinishForm}>
                    <Form.Item
                        label="Code"
                        name="code">
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Nội dung"
                        name="content">
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Giới hạn sử dụng"
                        name="limit_count">
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="% giảm"
                        name="discount">
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Ngưỡng"
                        name="threshold">
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Tối đa nhận"
                        name="max_amount">
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label="Ngày áp dụng"
                        name="effective_at">
                        <DatePicker
                            // defaultValue={dayjs(moment.now(), dateFormatList[0])}
                            format={dateFormatList}/>
                    </Form.Item>
                    <Form.Item
                        label="Ngày kết thúc"
                        name="expiration_at">
                        <DatePicker
                            // defaultValue={dayjs(moment(moment(), "MM-DD-YYYY").add(7, 'days'), dateFormatList[0])}
                            format={dateFormatList}/>
                    </Form.Item>
                    <div className='modal_btn'>
                        <Button htmlType='submit'>Ok</Button>
                        <Button onClick={handleCancel}>Cancel</Button>
                    </div>
                </Form>
            </Modal>
        </>
    );
};
export default PopupCreateVoucher;
