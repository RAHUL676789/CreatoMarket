import React, { useEffect, useState } from "react";
import ContentCard from "../components/ContentCard";
import SkeletonCard from "../components/SkeletonCard";
import Button from "../components/Button";
import { useLocation } from "react-router-dom";
import { debounceFunc } from "../helper/debounce";
const Contents = () => {
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentCard, setcurrentCard] = useState(null);
  const [deleteTitle, setdeleteTitle] = useState("");
  const [deleteBtn, setdeleteBtn] = useState(true);
  const [deleteFoun, setdeleteFoun] = useState(false)
  const location = useLocation();
  const [isEditModalOpen, setisEditModalOpen] = useState(false)

  const [editFormData, seteditFormData] = useState({
    title: "",
    price: 0,
    description: "",
    url: ""
  })

  // console.log(location);

  const wait = () => {
    return new Promise((res, rej) => {
      setTimeout(() => {
        setLoading(false);
      }, 5000);
    });
  };

  useEffect(() => {
    wait();
  }, []);

  const handleDeleteFunc = (data) => {

    setIsDeleteModalOpen(true);
    setcurrentCard(data)
  }


  const checkTitleAvailableOrNot = () => {
    console.log(deleteTitle)
    let result = location?.state?.some((item, i) => item.title == deleteTitle);
   
    if (result) {
      setdeleteFoun(true);
      setdeleteBtn(false);

    } else {
      setdeleteFoun(false);
    }
  }

  useEffect(() => {
    debounceFunc(checkTitleAvailableOrNot, 1000);
  }, [deleteTitle])

  const handleDeleteChange = (e) => {
    setdeleteTitle(e.target.value);
    if (deleteTitle == currentCard?.title) {
      setdeleteBtn(true);
    }
  }


  const handleEditFunc = (item)=>{
           setcurrentCard(item);
           setisEditModalOpen(true);
           seteditFormData((prev)=>{
            return {
              ...prev,
              title:item?.title,
              price:item?.price,
              description:item?.description,
              url:item?.url
            }
           })
  }

  return (
    <div className="px-2 py-3 relative overflow-scroll scrollbar-hidden justify-start items-start w-full h-screen flex flex-wrap gap-2 bg-gray-100">
      <div>
        {loading ? (
          <div className="w-full h-full flex flex-wrap gap-2 justify-center items-center">
            {[...Array(8)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div className="flex h-full flex-wrap justify-center items-center gap-2">
            {location?.state?.map((item, i) => (
              <ContentCard key={i}
                card={item}
                deleteFunc={() => handleDeleteFunc(item)}
                editFunc = {()=>handleEditFunc(item)}
              />
            ))}
          </div>
        )}
      </div>

      {/* 🛑 Delete Modal 🛑 */}
      {isDeleteModalOpen && (
        <div className="fixed font-serif top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-5 rounded-lg shadow-lg w-96">
            <h1 className="text-lg font-bold mb-3">
              Hey user, do you want to delete this content? Type {<span className="text-red-500 text-xs">{currentCard?.title} </span>}
              to confirm.
            </h1>
            <input
              type="text"
              className="w-full border p-2 mb-2 rounded-lg focus:outline-none"
              placeholder="type content title to delete"
              value={deleteTitle}
              onChange={handleDeleteChange}
            />
            {deleteTitle.trim() != "" && !deleteFoun ? <p className={`text-xs ${!deleteFoun && "text-red-600 mb-2"}`}>Content not found with following title</p> : null}

            <div className="flex justify-end gap-2">
              <Button
                content="Cancel"
                className="bg-gray-500 text-white px-7 py-2 rounded-2xl"
                func={() => setIsDeleteModalOpen(false)}
              />
              <Button
                content="Delete"
                className="bg-red-600  disabled:cursor-not-allowed disabled:bg-gray-400  text-white px-7  py-2 rounded-2xl"
                disabled={deleteBtn}
                func={() => console.log("deleted")}
              />
            </div>
          </div>
        </div>
      )}


      {isEditModalOpen && (
        <div className="fixed py-2 font-serif left-0 top-0 bg-black h-full w-full flex justify-center items-center">
          <div className="editContent h-full overflow-y-scroll  scrollbar-hidden  bg-white w-[60%] px-5 flex flex-col gap-3">
            <div className="header h-54">
              <h1 className="text-xl text-[#0e172b] text-center mb-2 font-semibold">Edit this content</h1>
              <div className="h-full">
                <img src={editFormData?.url}
                  alt="content-image"
                  className="h-full w-full bg-repeat"
                />
              </div>
            </div>

            <div className="form mt-4 flex-grow py-4 font-semibold  ">


              <form className="w-full  h-full flex flex-col justify-start items-center">
                <div className="title w-full  justify-center items-start  flex flex-col gap-1 px-4">
                  <label htmlFor="">
                    title
                  </label>
                  <input type="text"
                  value={editFormData?.title}
                    className="bg-gray-200 w-[100%] py-2 rounded-xs border outline-none px-2" />
                </div>
                <div className="title w-full  justify-center items-start  flex flex-col gap-1 px-4">
                  <label htmlFor="">price</label>
                  <input 
                  value={editFormData?.price}
                  type="text " className="bg-gray-200 w-[100%] py-2 px-2 border outline-none" />
                </div>
                <div className="title w-full  justify-center items-start  flex flex-col gap-1 px-4">
                  <label htmlFor="">description</label>
                  <input
                  value={editFormData?.description} type="text" className="bg-gray-200 w-[100%] py-2 px-2 border outline-none" />
                </div>




                <div className="buttons  w-full justify-center gap-3 flex mt-4 py-2">
                    <Button content="Delete" className="px-7 py-2 bg-[#ee223d] text-white font-bold "/>
                    <Button content="Cancel" className="px-7 py-2 bg-[#0e172b] text-white font-bold "/>
                </div>
              </form>
            </div>

          </div>
        </div>
      )}


      {/* 🔘 Delete Button to Open Modal */}
      {!loading && <Button
        content="Open Delete Modal"
        className="fixed bottom-5 right-5 bg-red-500 text-white px-4 py-2 rounded-lg"
        func={() => setIsDeleteModalOpen(true)}
      />}
    </div>
  );
};

export default Contents;
