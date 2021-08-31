import { useState, useEffect } from 'react'
import CommentList from './CommentList'
import AddComment from './AddComment'
import Loading from './Loading'
import Error from './Error'

const CommentArea = ({asin}) => {

    const [comments, setComments] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState(false)

   

    useEffect(() => {

        const getComments = async () => {

            setIsLoading(true)
    
            try {
                let response = await fetch('https://striveschool-api.herokuapp.com/api/comments/' + asin, {
                    headers: {
                        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTJlMmE1ZThiYmM0NTAwMTU2MTBhYTYiLCJpYXQiOjE2MzA0MTU0NTQsImV4cCI6MTYzMTYyNTA1NH0.u9vTfq_WNqwLsjbIIZgyoJItlvNlewthIPo-1r0wx_8"
                    }
                })
                console.log(response)
                if (response.ok) {
                    let comments = await response.json()
                    console.log('comments', comments);
                    setComments(comments)
                    setIsLoading(false)
                    setIsError(false)
                } else {
                    console.log('error')
                    setIsLoading(false)
                    setIsError(true)
                }
            } catch (error) {
                console.log(error)
                setIsLoading(false)
                setIsError(true)
            }
        }

        getComments()
    }, [asin])
        
       

        return (
            <div>
                {isLoading && <Loading />}
                {isError && <Error />}
                <AddComment asin={asin} />
                <CommentList commentsToShow={comments} />
            </div>
        )
    }


export default CommentArea