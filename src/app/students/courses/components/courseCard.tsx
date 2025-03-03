import { ICourse } from "@/store/courses/types"
import { useAppDispatch } from "@/store/hooks"
import { useCallback, useState } from "react"
import Modal from "./modal"



function CourseCard({course}:{course:ICourse}){
  const [isModalOpen, setIsModalOpen] = useState(false)
    const openModal = useCallback( (id:string) =>{
      setIsModalOpen(true)
      setCourseId(id)
    },[])
    const closeModal = useCallback( ()=>setIsModalOpen(false),[])
    const [courseId,setCourseId] = useState<string>("")
    return ( 
 <div className="max-w-lg mt-4 bg-gray-900 shadow-lg rounded-2xl">
   {isModalOpen && <Modal closeModal={closeModal} courseId={courseId}  />}
  <div className="px-6 py-5">
    <div className="flex items-start">
      <div className="flex-grow truncate">
        <div className="w-full sm:flex justify-between items-center mb-3">
          <h2 className="text-2xl leading-snug font-extrabold text-gray-50 truncate mb-1 sm:mb-0">{course?.title}</h2>
        </div><span className="bg-red-500 px-2 py-0.5 font-semibold text-sm rounded-lg text-white">{course?.category?.name}</span>

        <div className="flex items-end justify-between whitespace-normal">
          <div className="max-w-md text-indigo-100">
            <p className="mb-2">{course?.description.substring(0,80)}...</p>
          </div>
        </div>
        <div className="flex items-center  ml-4">
          <div className="flex gap-4  items-center mr-4">
            <button onClick={()=>openModal(course?._id as string)} className="bg-blue-500 p-2 hover:bg-blue-700">Enroll</button>
          </div><span className="text-sm text-gray-400">Duration : {course?.duration}</span> 
          <span className="text-sm text-gray-400">Price : {course?.price}</span>
        </div>
      </div>
      {/* <div className="flex flex-col mt-auto gap-[10px]">
        <button className=" cursor-pointer flex gap-2 items-center text-left text-sm font-medium text-indigo-100 hover:text-white group focus:outline-none focus-visible:border-b focus-visible:border-indigo-100"><svg width="24px" height="24px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M960 160h-291.2a160 160 0 0 0-313.6 0H64a32 32 0 0 0 0 64h896a32 32 0 0 0 0-64zM512 96a96 96 0 0 1 90.24 64h-180.48A96 96 0 0 1 512 96zM844.16 290.56a32 32 0 0 0-34.88 6.72A32 32 0 0 0 800 320a32 32 0 1 0 64 0 33.6 33.6 0 0 0-9.28-22.72 32 32 0 0 0-10.56-6.72zM832 416a32 32 0 0 0-32 32v96a32 32 0 0 0 64 0v-96a32 32 0 0 0-32-32zM832 640a32 32 0 0 0-32 32v224a32 32 0 0 1-32 32H256a32 32 0 0 1-32-32V320a32 32 0 0 0-64 0v576a96 96 0 0 0 96 96h512a96 96 0 0 0 96-96v-224a32 32 0 0 0-32-32z" fill="#fff" /><path d="M384 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0zM544 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0zM704 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0z" fill="#fff" /></svg></button><a className="cursor-pointer flex gap-2 items-center text-left text-sm font-medium text-indigo-100 hover:text-white group focus:outline-none focus-visible:border-b focus-visible:border-indigo-100" href="/edit/ug7053w5x6ug5jrkt295g4fo"><svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22H15C20 22 22 20 22 15V13" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M16.04 3.02001L8.16 10.9C7.86 11.2 7.56 11.79 7.5 12.22L7.07 15.23C6.91 16.32 7.68 17.08 8.77 16.93L11.78 16.5C12.2 16.44 12.79 16.14 13.1 15.84L20.98 7.96001C22.34 6.60001 22.98 5.02001 20.98 3.02001C18.98 1.02001 17.4 1.66001 16.04 3.02001Z" stroke="#FFF" strokeWidth="1.5" strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round">
            </path>
            <path d="M14.91 4.1499C15.58 6.5399 17.45 8.4099 19.85 9.0899" stroke="FFF" strokeWidth="1.5" strokeMiterlimit={10} strokeLinecap="round" strokeLinejoin="round" />
          </svg></a><button className=" cursor-pointer flex flex-col items-center text-left text-sm font-medium text-indigo-100 hover:text-white group focus:outline-none focus-visible:border-b focus-visible:border-indigo-100"><svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.0039 12C21.0039 16.9706 16.9745 21 12.0039 21C9.9675 21 3.00463 21 3.00463 21C3.00463 21 4.56382 17.2561 3.93982 16.0008C3.34076 14.7956 3.00391 13.4372 3.00391 12C3.00391 7.02944 7.03334 3 12.0039 3C16.9745 3 21.0039 7.02944 21.0039 12Z" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg><span>8</span></button>
      </div> */}
    </div>
  </div>
</div>

    )
}

export default CourseCard