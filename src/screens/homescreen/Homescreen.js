import React, { useEffect } from 'react'
import { Col, Container } from 'react-bootstrap'
import Video from '../../components/video/Video'
import CategoriesBar from '../../components/categoriesBar/CategoriesBar'
import { useDispatch, useSelector } from 'react-redux'
import {
   getPopularVideos,
   getVideosByCategory,
} from '../../redux/actions/videos.action'

import InfiniteScroll from 'react-infinite-scroll-component'
import SkeletonVideo from '../../components/skeletons/SkeletonVideo'

const Homescreen = () => {
   const dispatch = useDispatch()
   useEffect(() => {
      dispatch(getPopularVideos())
   }, [dispatch])

   const { videos, activeCategory, loading } = useSelector(
      state => state.homeVideos
   )

   const fetchData = () => {
      if (activeCategory === 'All') dispatch(getPopularVideos())
      else {
         dispatch(getVideosByCategory(activeCategory))
      }
   }

   return (
      <Container>
         <CategoriesBar />

         <InfiniteScroll
            dataLength={videos.length}
            next={fetchData}
            hasMore={true}
            loader={
               <div className='spinner-border text-danger d-block mx-auto'></div>
            }
            className='row'>
            {!loading
               ? videos.map(video => (
                    <Col lg={4} md={3} key={video.id}>
                       <Video video={video} />
                    </Col>
                 ))
               : [...Array(20)].map((_, index) => (
                    <Col lg={4} md={3} key={index}>
                       <SkeletonVideo />
                    </Col>
                 ))}
         </InfiniteScroll>
      </Container>
   )
}

export default Homescreen