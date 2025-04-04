import React, { useEffect, useState } from "react";
import ContentCard from "../components/ContentCard";
import SkeletonCard from "../components/SkeletonCard";
import Button from "../components/Button";
import { useLocation } from "react-router-dom";
import { debounceFunc } from "../helper/debounce";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux"
import { updateContent,removeContent } from "../features/user/userSlice";
import NotFound from "../components/NotFound";
const Contents = () => {
  const [loading, setLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentCard, setcurrentCard] = useState(null);
  const [deleteTitle, setdeleteTitle] = useState("");
  const [deleteBtn, setdeleteBtn] = useState(true);
  const [deleteFoun, setdeleteFoun] = useState(false)
  const location = useLocation();
  const [isEditModalOpen, setisEditModalOpen] = useState(false)
  const [isEdit, setisEdit] = useState(false);
  const user = useSelector((state) => state.user);
  const [card, setcard] = useState(user?.contents?.filter(item => item?.type == location?.state));
  const URL = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();

  const [editFormData, seteditFormData] = useState({
    title: "",
    price: currentCard?.price || 0,
    description: "",
    url: ""
  })

  console.log(location);

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
    let result = user?.contents?.some((item, i) => item.title == deleteTitle);

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


  const handleEditFunc = (item) => {
    setcurrentCard(item);
    setisEditModalOpen(true);
    seteditFormData((prev) => {
      return {
        ...prev,
        title: item?.title,
        price: item?.price,
        description: item?.description,
        url: item?.url
      }
    })
  }


  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (currentCard?.title == editFormData?.title && currentCard?.price == editFormData?.price && currentCard?.description == editFormData?.description && currentCard?.url == editFormData?.url) {
      toast.error("No changes made to the content");
      return;
    }

    try {
      const response = await fetch(`${URL}/content/update`, {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...editFormData,
          id: currentCard?._id
        }),
      });

      const result = await response.json();
      console.log(result);
      if (result?.success === true) {
        toast.success("Content updated successfully")
        setisEditModalOpen(false);
        setisEdit(false);
        seteditFormData({
          title: "",
          price: 0,
          description: "",
          url: ""
        })
        dispatch(updateContent(result.data))

      } else {
        toast.error("Error updating content")
      }
    } catch (error) {
      console.log(error);

    }

  }


  const handleEditFormInput = (e) => {
    seteditFormData((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value
      }
    })
  }

  const handleDeleteContent = async(e)=>{
    try {
      const response = await fetch(`${URL}/content/delete`, {
        method:"delete",
        credentials:"include",
        headers:{
          "content-type":"application/json"
        },
        body:JSON.stringify({id:currentCard?._id})
      });
      const result = await response.json();
      if(result.success){
        dispatch(removeContent(result.data));
        setIsDeleteModalOpen(false);
        setcard((prev) => {
          return prev.filter(item => item._id != result?.data?._id)
        })
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message || "Error deleting content")

    }
  }

  console.log("card",card)
  return (
    <div className="px-2 py-3 relative overflow-scroll scrollbar-hidden justify-start items-start w-full h-screen flex flex-wrap gap-2 bg-gray-100">
    <div className="w-full">
  {loading ? (
    <div className="w-full p-2 flex flex-wrap justify-center items-center">
      {[...Array(8)].map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  ) : (
    <>
      {card?.length > 0 ? (
        <div className="w-full px-4 mt-4 gap-4 columns-1 sm:columns-2 md:columns-2 xl:columns-4">
          {user?.contents?.map((item, i) =>
            item?.type == location?.state && (
              <div key={i} className="break-inside-avoid mb-4">
                <ContentCard 
                  card={item} 
                  deleteFunc={() => handleDeleteFunc(item)} 
                  editFunc={() => handleEditFunc(item)} 
                />
              </div>
            )
          )}
        </div>
      ) : (
        // 🚀 NotFound component ko columns ke bahar rakho
        <div className="w-full flex justify-center items-center mt-10">
          <NotFound errMsg="Content not found" />
        </div>
      )}
    </>
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
                func={handleDeleteContent}
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
              <div className="h-full ">
                <img src={editFormData?.url}
                  alt="content-image"
                  className="h-full w-full bg-repeat "
                />
              </div>
            </div>

            <div className="form mt-4 flex-grow py-4 font-semibold  ">


              <form onSubmit={handleEditSubmit} className="w-full  h-full flex flex-col justify-start items-center">
                <div className="title w-full  justify-center items-start  flex flex-col gap-1 px-4">
                  <label htmlFor="">
                    title
                  </label>
                  <input type="text"
                    value={editFormData?.title}
                    className="bg-gray-200 w-[100%] py-2 rounded-xs border outline-none px-2"
                    name="title"
                    onChange={handleEditFormInput} />
                </div>
                <div className="title w-full  justify-center items-start  flex flex-col gap-1 px-4">
                  <label htmlFor="">price</label>
                  <input
                    value={editFormData?.price}
                    name="price"
                    onChange={handleEditFormInput}
                    type="number" className="bg-gray-200 w-[100%] py-2 px-2 border outline-none" />
                </div>
                <div className="title w-full  justify-center items-start  flex flex-col gap-1 px-4">
                  <label htmlFor="">description</label>
                  <input
                    name="description"
                    onChange={handleEditFormInput}
                    value={editFormData?.description} type="text" className="bg-gray-200 w-[100%] py-2 px-2 border outline-none" />
                </div>




                <div className="buttons  w-full justify-center gap-3 flex mt-4 py-2">
                  <Button type="submit" content="Update" className="px-7 py-2 bg-[#ee223d] text-white font-bold " />
                  <Button func={() => setisEditModalOpen(false)} type="button" content="Cancel" className="px-7 py-2 bg-[#0e172b] text-white font-bold " />
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
        func={() =>
           { setcurrentCard(null)
           setIsDeleteModalOpen(true)}
        }
      />}
    </div>
  );
};

export default Contents;
