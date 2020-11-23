import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Input, Row, Col, Space, Collapse, Typography, Tooltip, Button, } from "antd"
import { EditOutlined, PlusOutlined } from "@ant-design/icons"
import moment from "moment"

import CustomModal from "../../components/CustomModal"

import { getAllNotes } from "./redux/action"

import { formatDate, noteColors } from "../../utils/constants"

import useModal from "../../hooks/useModal"

const { Search } = Input
const { Panel } = Collapse
const { Text } = Typography

const createBtnStyle = {
    position: "absolute",
    bottom: 16,
    right: 16
}

const defaultNote = {
    title: "",
    text: "",
    color: noteColors.NORMAL
}

const validateMessages = {
    required: '${label} is required!'
}

const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
}

const Note = props => {
    useEffect(() => {
        getData()
    }, [])

    const dispatch = useDispatch()

    const getData = async () => {
        await getAllNotes()(dispatch)
    }

    const [searchString, setSearchString] = useState("")
    const onSearch = () => {
        console.log(searchString)
    }

    const noteList = useSelector(state => state.note.noteList)

    const generateTime = note => {
        if (!note.updatedAt) return

        const date = new Date(note.updatedAt)
        return <Space>
            <span className="bold small">{moment(date).format(formatDate)}</span>
            <EditOutlined className="hover-blue" onClick={e => {
                e.stopPropagation()
                setCurrentNote(note)
                toggle()
            }} />
        </Space>
    }

    const CreateBtn = () => <div style={createBtnStyle}>
        <Tooltip title="Add note" >
            <Button
                type="primary"
                size="large"
                shape="circle"
                icon={<PlusOutlined />}
                onClick={toggle}
            />
        </Tooltip>
    </div>

    const [currentNote, setCurrentNote] = useState(defaultNote)
    const [isOpen, toggle] = useModal()

    const onFinish = data => {
        console.log(data)
    }

    const renderModal = () => <CustomModal
        title={currentNote.title}
        isOpen={isOpen}
        toggle={toggle}
        handleOk={() => console.log("OK")}
        handleCancel={() => {
            setCurrentNote(defaultNote)
            console.log("Cancel")
        }}
    >
        <Space direction="vertical" style={{ width: "100%" }}>
            <span className="bold">Title</span>
            <Input value={currentNote.title} />

            <span className="bold">Text</span>
            <Input.TextArea value={currentNote.text} />
        </Space>
    </CustomModal>

    return <Space direction="vertical" style={{ width: "100%" }}>
        <CreateBtn />

        {renderModal()}

        <Row style={{ marginBottom: 8 }}>
            <Col md={12} sm={24} xs={24} style={{ padding: "0 8px" }}>
                <Search
                    placeholder="Search"
                    allowClear
                    value={searchString}
                    onChange={e => setSearchString(e.target.value)}
                    onSearch={onSearch}
                />
            </Col>
        </Row>
        <Row>
            {noteList.map(note => <Col md={12} sm={24} xs={24} style={{ padding: "0 8px" }}>
                <Collapse style={{ marginBottom: 8 }}>
                    <Panel
                        key={note._id}
                        header={note.title}
                        extra={generateTime(note)}
                        style={{ backgroundColor: note.color }}
                    >
                        <Text strong>{note.text}</Text>
                    </Panel>
                </Collapse>
            </Col>)}
        </Row>
    </Space>
}

export default Note