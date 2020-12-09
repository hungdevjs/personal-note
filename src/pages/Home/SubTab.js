import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Input, Row, Col, Space, Collapse, Typography, Tooltip, Button, Alert, DatePicker, Switch } from "antd"
import { EditOutlined, PlusOutlined, CheckCircleOutlined } from "@ant-design/icons"
import moment from "moment"

import CustomModal from "../../components/CustomModal"
import NoteColorPicker from "../../components/NoteColorPicker"

import { getAllNotes, update, create, remove, complete } from "./redux/action"
import { setModal } from "../../commons/action"

import { dateFormat, NORMAL_NOTE_COLOR } from "../../utils/constants"
import { alert, matchingSearch } from "../../utils/helper"

import useModal from "../../hooks/useModal"

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
    color: NORMAL_NOTE_COLOR,
    startTime: null,
    endTime: null
}

const Note = ({ isCompleted }) => {
    useEffect(() => {
        getData()
    }, [])

    const dispatch = useDispatch()

    const getData = async () => {
        await getAllNotes()(dispatch)
    }

    const filterNoteList = noteList => {
        if (!isCompleted) {
            return noteList.filter(note => !note.isCompleted)
        }

        return noteList.filter(note => note.isCompleted).sort((note1, note2) => note2.completedAt - note1.completedAt)
    }

    const noteList = useSelector(state => filterNoteList(state.note.noteList))
    const [searchString, setSearchString] = useState("")

    const generateTime = note => {
        const start = note.startTime
            ? new Date(note.startTime)
            : null

        const completed = note.completedAt
            ? new Date(note.completedAt)
            : null

        return <Space>
            {!!start && <span className="strong-bold small">{moment(start).format(dateFormat)}</span>}
            {!!completed && <span className="strong-bold small">{moment(completed).format(dateFormat)}</span>}
            <EditOutlined
                className="hover-blue"
                onClick={e => {
                    e.stopPropagation()
                    setCurrentNote(note)
                    toggle()
                }}
            />
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

    useEffect(() => {
        setIsShowTime(!!currentNote.endTime)
    }, [currentNote])

    const submitNote = async () => {
        try {
            if (!currentNote) throw new Error("No data")

            if (!currentNote.title.trim() && !currentNote.text.trim()) {
                throw new Error("Empty note")
            }

            if (currentNote.endTime && !currentNote.startTime) {
                throw new Error("Start time is empty")
            }

            if (currentNote.startTime && currentNote.endTime && currentNote.startTime > currentNote.endTime) {
                throw new Error("Invalid time range")
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
                type: "error",
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

    const onComplete = () => {
        if (!currentNote) return
        dispatch(setModal({
            isOpen: true,
            title: "Warning",
            message: "Are you sure that you completed this task/note?",
            handleOk: async () => {
                await complete(currentNote._id)(dispatch)
                setCurrentNote(defaultNote)
                toggle()
                getData()
            }
        }))
    }

    const [isShowTime, setIsShowTime] = useState(false)

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
        noFooter={isCompleted}
    >
        <Space direction="vertical" style={{ width: "100%" }}>
            {!isCompleted && <NoteColorPicker
                color={currentNote.color}
                setColor={color => editCurrentNote({ color })}
            />}
            <Switch
                checkedChildren="Date range"
                unCheckedChildren="Single date"
                checked={isShowTime}
                disabled={isCompleted}
                onChange={e => {
                    setIsShowTime(e)
                    if (!e) {
                        editCurrentNote({ endTime: null })
                    }
                }}
            />
            <div style={{ borderRadius: 4, padding: 16, marginTop: 8, backgroundColor: currentNote.color }}>
                <span className="bold">Title</span>
                <Input
                    style={{ marginBottom: 8 }}
                    value={currentNote.title}
                    onChange={e => editCurrentNote({ title: e.target.value })}
                    disabled={isCompleted}
                />

                <span className="bold">Text</span>
                <Input.TextArea
                    style={{ marginBottom: 8 }}
                    value={currentNote.text}
                    onChange={e => editCurrentNote({ text: e.target.value })}
                    disabled={isCompleted}
                />

                <span className="bold">{isShowTime ? "Start date" : "Date"}</span>
                <DatePicker
                    style={{ width: "100%", marginBottom: 8 }}
                    onChange={e => editCurrentNote({ startTime: new Date(e._d).getTime() })}
                    value={currentNote.startTime && moment(new Date(currentNote.startTime), dateFormat)}
                    format={dateFormat}
                    disabled={isCompleted}
                />

                {isShowTime && <>
                    <span className="bold">End date</span>
                    <DatePicker
                        style={{ width: "100%", marginBottom: 8 }}
                        onChange={e => editCurrentNote({ endTime: new Date(e._d).getTime() })}
                        value={currentNote.endTime && moment(new Date(currentNote.endTime), dateFormat)}
                        format={dateFormat}
                        disabled={isCompleted}
                    />
                </>}
            </div>

            {!currentNote.isCompleted && currentNote._id && <Button
                block
                style={{ backgroundColor: "dodgerblue", color: "#fff", fontWeight: 650 }}
                onClick={onComplete}
            >
                Completed
                <CheckCircleOutlined />
            </Button>}

            {currentNote.isCompleted && <div>
                <span style={{ marginRight: 8 }}>Completed!</span>
                <CheckCircleOutlined style={{ color: "green" }} />
            </div>}
        </Space>
    </CustomModal>

    const notesRender = noteList.filter(note => matchingSearch(note.title, searchString) || matchingSearch(note.text, searchString))

    return <div>
        {!isCompleted && <CreateBtn />}

        {renderModal()}

        <Row style={{ marginBottom: 8 }}>
            <Col md={12} sm={24} xs={24} style={{ padding: "0 8px" }}>
                <Input
                    placeholder="Search"
                    value={searchString}
                    onChange={e => setSearchString(e.target.value)}
                />
            </Col>
        </Row>
        <Row>
            {notesRender && notesRender.length > 0
                ? notesRender.map(note => <Col key={note._id} md={12} sm={24} xs={24} style={{ padding: "0 8px" }}>
                    <Collapse style={{ marginBottom: 8 }}>
                        <Panel
                            header={note.title}
                            extra={generateTime(note)}
                            style={{ backgroundColor: note.color }}
                        >
                            {!!note.startTime && <div>
                                <span className="strong-bold small">{moment(new Date(note.startTime)).format(dateFormat)}</span>
                                {!!note.endTime && <span className="strong-bold small">-{moment(new Date(note.endTime)).format(dateFormat)}</span>}
                            </div>}
                            <Text strong>{note.text}</Text>
                        </Panel>
                    </Collapse>
                </Col>)
                : <Col md={12} sm={24} xs={24} style={{ padding: "0 8px" }}>
                    <Alert message="No note to display" type="info" />
                </Col>}
        </Row>
    </div>
}

export default Note