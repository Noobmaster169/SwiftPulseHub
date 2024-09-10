"use client";

//import "antd/dist/reset.css";
import "./DropDown.css";
import React from "react"; 
import { Form, Input, Button, Select } from "antd";
import type {FormProps} from 'antd';

const { TextArea } = Input;

type FieldType = {
  task_name?: string;
  description?: string;
  //..........
};

const onFinish: FormProps<FieldType>['onFinish'] = (values:FieldType) => {
  alert("Finished");
  console.log('Success:', values);
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = () => {
  alert('Form Submission Failed');
};

function DropDown() {
  return (
    <div className="DropDown">
      <header className="DropDown-header">
        <Form
          labelCol={{ span: 9 }}   // Adjusts the width of the label
          wrapperCol={{ span: 14 }} // Adjusts the width of the input field
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item label="Task name" name="task_name">
            <Input className="custom-input" />
          </Form.Item>

          {/* Making the description input field larger with more width */}
          <Form.Item label="Description" name="description">
            <TextArea rows={4} className="custom-textarea" />
          </Form.Item>

          <Form.Item label="Type" name="type">
            <Select className="custom-select">
              <Select.Option value="type 1">Type 1</Select.Option>
              <Select.Option value="type 2">Type 2</Select.Option>
              <Select.Option value="type 3">Type 3</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Storypoint" name="story point">
            <Select className="custom-select">
              <Select.Option value="story point 1">Story Point 1</Select.Option>
              <Select.Option value="story point 2">Story Point 2</Select.Option>
              <Select.Option value="story point 3">Story Point 3</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Assigned to" name="assigned to">
            <Select className="custom-select">
              <Select.Option value="myself">Myself</Select.Option>
              <Select.Option value="user 1">User 1</Select.Option>
              <Select.Option value="user 2">User 2</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 14 }}> {/* Align the button */}
            <Button type="primary" htmlType="submit">Confirm</Button>
          </Form.Item>

        </Form>
      </header>
    </div>
  );
}

export default DropDown;
