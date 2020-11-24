import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Input, Row, Col, Space, Collapse, Typography, Tooltip, Button, Alert } from "antd"
import { EditOutlined, PlusOutlined } from "@ant-design/icons"
import moment from "moment"

import CustomModal from "../../components/CustomModal"
import NoteColorPicker from "../../components/NoteColorPicker"

import { getAllNotes, update, create, remove } from "./redux/action"
import { setModal } from "../../commons/action"

import { fullDateFormat, NORMAL_NOTE_COLOR } from "../../utils/constants"
import { alert, matchingSearch } from "../../utils/helper"

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
    color: NORMAL_NOTE_COLOR
}

const Note = props => {
    useEffect(() => {
        getData()
    }, [])

    const dispatch = useDispatch()

    const getData = async () => {
        await getAllNotes()(dispatch)
    }

    const noteList = useSelector(state => state.note.noteList)
    const [searchString, setSearchString] = useState("")

    const generateTime = note => {
        if (!note.updatedAt) return

        const date = new Date(note.updatedAt)
        return <Space>
            <span className="strong-bold small">{moment(date).format(fullDateFormat)}</span>
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

    const editCurrentNote = value => {
        setCurrentNote({
            ...currentNote,
            ...value
        })
    }

    const submitNote = async () => {
        try {
            if (!currentNote) throw new Error("No data")

            if (!currentNote.title.trim() && !currentNote.text.trim()) {
                throw new Error("Empty note")
            }

            const nextFunction = currentNote._id
                ? update
                : create

            await nextFunction(currentNote)(dispatch)

            setCurrentNote(defaultNote)
            toggle()
            getData()
        } catch (err) {
            alert({
                type: "danger",
                message: err.message
            })
        }
    }

    const onRemove = () => {
        if (!currentNote) return
        dispatch(setModal({
            isOpen: true,
            title: "Warning",
            message: "Do you want to remove this note?",
            handleOk: async () => {
                await remove(currentNote._id)(dispatch)
                setCurrentNote(defaultNote)
                toggle()
                getData()
            }
        }))
    }

    const renderModal = () => <CustomModal
        title={currentNote.title}
        isOpen={isOpen}
        toggle={toggle}
        handleOk={submitNote}
        handleCancel={() => {
            setCurrentNote(defaultNote)
        }}
        btnTitle="Delete"
        callback={currentNote._id && onRemove}
    >
        <Space direction="vertical" style={{ width: "100%" }}>
            <NoteColorPicker
                color={currentNote.color}
                setColor={color => editCurrentNote({ color })}
            />

            <div style={{ borderRadius: 4, padding: 16, marginTop: 8, backgroundColor: currentNote.color }}>
                <span className="bold">Title</span>
                <Input
                    value={currentNote.title}
                    onChange={e => editCurrentNote({ title: e.target.value })}
                />

                <span className="bold">Text</span>
                <Input.TextArea
                    value={currentNote.text}
                    onChange={e => editCurrentNote({ text: e.target.value })}
                />
            </div>
        </Space>
    </CustomModal>

    return <Space direction="vertical" style={{ width: "100%" }}>
        <CreateBtn />

        {renderModal()}

        <Row style={{ marginBottom: 8 }}>
            <Col md={12} sm={24} xs={24} style={{ padding: "0 8px" }}>
                <Input
                    placeholder="Search"
                    // allowClear
                    value={searchString}
                    onChange={e => setSearchString(e.target.value)}
                // onSearch={onSearch}
                />
            </Col>
        </Row>
        <Row>
            {noteList && noteList.length > 0
                ? noteList.filter(note => matchingSearch(note.title, searchString) || matchingSearch(note.text, searchString)).map(note => <Col md={12} sm={24} xs={24} style={{ padding: "0 8px" }}>
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
                </Col>)
                : <Col md={12} sm={24} xs={24} style={{ padding: "0 8px" }}>
                    <Alert message="No note to display" type="info" />
                </Col>}
        </Row>
    </Space>
}

export default Note