import {connect} from 'react-redux'
import classes from './BookLone.module.css'
import {addBook, delBook, saveBook} from '../../../redux/actions'
import React, {useState, useCallback, lazy, Suspense} from "react"
import Button from "react-bootstrap/Button"
import {
    setSaveButtonData,
    setFinalItemData,
    imageLoader,
    imageChanger,
    setStartingItemData,
} from '../../helpFunctions/helpFunctions'
import C from '../../../redux/constants'

const SaveBookButton = lazy( () => import("./SaveBookButton"))
const AuthorSelect = lazy( () => import("./AuthorSelect"))
const LoneInput = lazy( () => import("../../helpFunctions/LoneInput"))
const LoneDeleted = lazy( () => import("../../helpFunctions/LoneDeleted"))

const BookLone = (props) => {
    const theBook = setStartingItemData(props.match.params.id, props.books, C.BOOK)

    const [deleted, setDeleted] = useState(false)

    const [bookTitle, setBookTitle] = useState(theBook.title)
    const [bookCreatedAt, setBookCreatedAt] = useState(theBook.created_at)
    const [bookLastName, setBookLastName] = useState(theBook.last_name)
    const [bookFirstName, setBookFirstName] = useState(theBook.first_name)
    const [bookImage, setBookImage] = useState(theBook.image)

    const handlerAuthorChange = value => {
        setBookFirstName(value.split(' ')[0])
        setBookLastName(value.split(' ')[1])
    }

    const [file,setFile] = useState('')

    const bookData = setFinalItemData(C.BOOK, theBook.id, bookLastName, bookFirstName, bookTitle, bookCreatedAt, bookImage)

    const creation = props.match.path === C.bookCreationURL
    const initialSaveButtonData = setSaveButtonData(props.onSave, props.onAdd, creation, 'book')

    const handleFileChange = useCallback(event => {
        const newFile = imageChanger(event)
        setFile(newFile)
    }, [])

    if (deleted)
        return <Suspense fallback={<div>Загрузка...</div>}>
            <LoneDeleted text={'Книга удалена'}
                         className={classes.BookLone}
            />
    </Suspense>


    return (
        <div className={classes.BookLone}>
            <Suspense fallback={<div>Загрузка...</div>}>
                <LoneInput value={bookTitle}
                           name={'title'}
                           handler={setBookTitle}
                           text={'Название:'}
                />
                <AuthorSelect handlerAuthorChange={handlerAuthorChange}
                              creation={creation}
                              theBook={theBook}
                              authors={props.authors}
                />
                <LoneInput value={bookCreatedAt}
                           name={'started_at'}
                           className={classes.started_at}
                           handler={setBookCreatedAt}
                           text={'Первая публикация:'}
                />
            </Suspense>
            <div style={{justifyContent:'space-between'}}>
                {
                    !creation && <img src={theBook.image} alt={theBook.title + '_image'}/>
                }
                <span className={classes.spanAddImage}>
                    <input type={'file'}
                           onChange={handleFileChange}
                    />
                    <Button onClick={() => imageLoader(file)}
                            variant={'secondary'}
                    >
                        Сменить обложку
                    </Button>
                </span>
            </div>
            <span className={classes.buttonDiv}>
                <Suspense fallback={<div>Загрузка...</div>}>
                    <SaveBookButton bookData={bookData}
                                    initialSaveButtonData={initialSaveButtonData}
                    />
                </Suspense>
                {
                    !creation && <Button onClick={() => {
                        props.onDelete(theBook.id)
                        setDeleted(true)
                    }}
                                         variant="danger"
                    >
                        Удалить книгу
                    </Button>
                }
            </span>
        </div>
    )
}


function mapStateToProps (state) {
    return {
        authors: state.authorReducer.authors,
        books: state.bookReducer.books
    }
}

function mapDispatchToProps (dispatch) {
    return {
        onDelete: id => dispatch(delBook(id)),
        onSave: (id,title,last_name,first_name,created_at,image) => dispatch(saveBook(id,title,last_name,first_name,created_at,image)),
        onAdd: (id,title,last_name,first_name,created_at,image) => dispatch(addBook(id,title,last_name,first_name,created_at,image))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(BookLone)