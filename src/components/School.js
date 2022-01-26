import { makePercent } from '../utils.js'
import PropTypes from 'prop-types'
import { BsBookmark, BsBookmarkFill } from 'react-icons/bs'
import { FaExternalLinkAlt } from 'react-icons/fa'
import '../css/School.css'


const School = ({ id, name, enrolled, website, womenEnrolledPercent, menGradRate, womenGradRate, changeBookmark, isBookmarked }) => {

    let bookmarkIcon = isBookmarked ? 
        <BsBookmarkFill className='bookmark fill' onClick={() => changeBookmark(id)} /> :
        <BsBookmark className='bookmark open' onClick={() => changeBookmark(id)} />

    return (
        <div className='school'>
            <header className='school-header'>
                <h4 className='school-name' >{name}</h4>
                {bookmarkIcon}
            </header>
            <a href={website} rel='noreferrer' target='_blank' className='detail url'><FaExternalLinkAlt /></a>
            <p className='detail enrollment' >Total enrollment: {enrolled}</p>
            <p className='detail' >Percent women enrolled: <span className='bold'>{makePercent(womenEnrolledPercent)}%</span></p>
            <p className='detail' >Graduation rate for men: <span className='bold'>{makePercent(menGradRate)}%</span></p>
            <p className='detail' >Graduation rate for women: <span className='bold'>{makePercent(womenGradRate)}%</span></p>
        </div>
    )
}

export default School

School.propTypes = {
    id: PropTypes.number,
    name: PropTypes.string,
    enrolled: PropTypes.number,
    website: PropTypes.string,
    womenEnrolledPercent: PropTypes.number,
    menGradRate: PropTypes.number,
    usSwomenGradRatetate: PropTypes.number,
    changeBookmark: PropTypes.func,
    isBookmarked: PropTypes.bool
}







