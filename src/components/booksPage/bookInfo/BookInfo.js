import {NavLink} from 'react-router-dom';
import classes from './Book.module.css';

const BookInfo = (props) => {
    const {id,title,last_name,first_name,created_at} = props;
    return (
        <div className={classes.BookInfo}>
            <div>
                <p>
                    <NavLink to={'/book/'+id}>
                        {title}
                    </NavLink>
                </p>
            </div>
            <div>
                <p>
                    {last_name}
                </p>
            </div>
            <div>
                <p>
                    {first_name}
                </p>
            </div>
            <div>
                <p>
                    {created_at}
                </p>
            </div>
        </div>
    )
};

export default BookInfo;
