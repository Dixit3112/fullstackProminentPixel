import React from 'react'
import "../styleFiles/footer.scss"

export default function Footer() {
    return (
        <div className="Footer">
            <div className="container">
                <div className='footer flex p-[3px] '>
                    <div><a href='/'>Home</a></div>
                    <div><a href='/contact'>Contact</a></div>
                </div>
            </div>
        </div>
    )
}
