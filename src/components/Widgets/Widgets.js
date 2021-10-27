import 'swiper/swiper.min.css';
import { useState } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from 'swiper';

import './widgets.less';
import { WidgetsModal } from '../Modals/Modals'

SwiperCore.use([Navigation]);

export const Widgets = ({ addWidget, categories, deleteWidget, loadingInProcess, widgets }) => {
    const [modalState, setModalState] = useState(false);
    
    const closeModal = () => {
        setModalState(false);
    }

    const widgetsSlides = [[]];
    widgets.forEach((item,i) => {
        if (i % 4 === 0 && i > 0) { widgetsSlides.push([]) }
        widgetsSlides[widgetsSlides.length-1].push(item)
    });

    return(
        <div className="widgets">
            <Swiper 
            slidesPerView={1} 
            grid={{
            "rows": 2
            }} 
            spaceBetween={20} 
            navigation={{
                prevEl: '#prev',
                nextEl: '#next'
            }}
            className="mySwiper"
            >
                {widgetsSlides.map((slide, i)=> { return(
                    <SwiperSlide key={i}>
                    <div className="widgets__container">
                    {slide.map(widget => { return(
                        <div 
                        className="widgets__card" 
                        style={{backgroundColor: widget.color + '26'}}
                        key={widget.id}
                        >
                            <div className="widgets__icon" style={{backgroundColor: widget.color + '26'}}>
                                <svg width="24" height="36" viewBox="0 0 24 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M23.4782 12.237C23.4782 5.93709 18.313 0.782608 12 0.782608C5.68695 0.782608 0.521729 5.93709 0.521729 12.237C0.521729 15.9597 2.24347 19.2528 4.96955 21.2573L3.39129 33.5708C3.24782 34.1435 3.53477 34.7163 3.96521 35.0026C4.39564 35.289 4.96955 35.289 5.54347 35.0026L12 31.1368L18.4565 35.0026C18.6 35.1458 18.8869 35.1458 19.1739 35.1458C19.4609 35.1458 19.7478 35.0026 19.8913 34.8594C20.3217 34.5731 20.6087 34.0004 20.4652 33.4276L18.8869 21.2573C21.7565 19.2528 23.4782 15.9597 23.4782 12.237ZM3.39129 12.237C3.39129 7.51207 7.26521 3.64621 12 3.64621C16.7348 3.64621 20.6087 7.51207 20.6087 12.237C20.6087 16.9619 16.7348 20.8278 12 20.8278C7.26521 20.8278 3.39129 16.9619 3.39129 12.237ZM12.7174 28.2732L17.3087 30.9936L16.3043 22.8324C15.013 23.4051 13.5783 23.6914 12 23.6914C10.4217 23.6914 8.98695 23.4051 7.69564 22.8324L6.69129 30.9936L11.2826 28.2732C11.713 27.9868 12.2869 27.9868 12.7174 28.2732Z" fill={widget.color}/>
                                </svg>
                            </div>
                            <p className="widgets__date">{widget.validity}</p>
                            <p className="widgets__text">Spend {widget.criterion} than {+widget.limit} on {widget.category.name}</p>
                            <p className="widgets__amount" style={{color: widget.color}} title={`${+widget.transactions_sum}/${+widget.limit}`}>{+widget.transactions_sum}/{+widget.limit}</p>
                            <div className="widgets__delete" onClick={() => deleteWidget(widget.id)}>X</div>
                        </div>
                    )})}
                    </div>
                    </SwiperSlide>
                )})}
            </Swiper>


            <div className="widgets__buttonsBlock">
                <div id="prev" className="widgets__navigation" >
                    <svg width="184" height="24" viewBox="0 0 184 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M183.061 13.0606C183.646 12.4749 183.646 11.5251 183.061 10.9393L173.515 1.39338C172.929 0.807596 171.979 0.807596 171.393 1.39338C170.808 1.97917 170.808 2.92892 171.393 3.5147L179.879 12L171.393 20.4853C170.808 21.0711 170.808 22.0208 171.393 22.6066C171.979 23.1924 172.929 23.1924 173.515 22.6066L183.061 13.0606ZM1.31134e-07 13.5L182 13.5L182 10.5L-1.31134e-07 10.5L1.31134e-07 13.5Z" fill="#5D5FEF"/>
                    </svg>
                </div>

                <div id="next" className="widgets__navigation" >
                    <svg width="184" height="24" viewBox="0 0 184 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M183.061 13.0606C183.646 12.4749 183.646 11.5251 183.061 10.9393L173.515 1.39338C172.929 0.807596 171.979 0.807596 171.393 1.39338C170.808 1.97917 170.808 2.92892 171.393 3.5147L179.879 12L171.393 20.4853C170.808 21.0711 170.808 22.0208 171.393 22.6066C171.979 23.1924 172.929 23.1924 173.515 22.6066L183.061 13.0606ZM1.31134e-07 13.5L182 13.5L182 10.5L-1.31134e-07 10.5L1.31134e-07 13.5Z" fill="#5D5FEF"/>
                    </svg>
                </div>

                <div className="widgets__add" onClick={() => setModalState(true)}>
                    <p>Add widget</p>
                    <div className="widgets__addHover"/>
                </div>
            </div>

            <WidgetsModal 
            addWidget={addWidget}
            categories={categories}
            closeModal={closeModal}
            loadingInProcess={loadingInProcess}
            modalState={modalState} 
            />
        </div>
    )
}