import { Button, Form } from 'react-bootstrap'
import { useState, useEffect } from "react"

const AddComment = ({asin}) => {

    const [comment, setComment] = useState({
        comment: '',
        rate: 1,
        elementId: null
    })

    useEffect(() => {
        setComment(comment => ({
            ...comment,
            elementId: asin
        }))

    },[asin])

    const sendComment = async (e) => {
        e.preventDefault()
        try {
            let response = await fetch('https://striveschool-api.herokuapp.com/api/comments', {
                method: 'POST',
                body: JSON.stringify(comment),
                headers: {
                    'Content-type': 'application/json',
                    Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTJlMmE1ZThiYmM0NTAwMTU2MTBhYTYiLCJpYXQiOjE2MzA0MTU0NTQsImV4cCI6MTYzMTYyNTA1NH0.u9vTfq_WNqwLsjbIIZgyoJItlvNlewthIPo-1r0wx_8"
                }
            })
            if (response.ok) {
                // the comment has been sent succesfully!!
                alert('Comment was sent!')
            } else {
                console.log('error')
                alert('something went wrong')
            }
        } catch (error) {
            console.log('error')
        }
    }

        return (
            <div>
                <Form onSubmit={sendComment}>
                    <Form.Group>
                        <Form.Label>Comment text</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Add comment here"
                            value={comment.comment}
                            onChange={e => setComment({
                                    ...comment,
                                    comment: e.target.value
                            })}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control as="select" value={comment.rate}
                            onChange={e => setComment({
                                    ...comment,
                                    rate: e.target.value
                            })}>
                            <option>1</option>
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                            <option>5</option>
                        </Form.Control>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>
        )
}

export default AddComment