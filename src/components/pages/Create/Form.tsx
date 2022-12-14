import React, { useState, useEffect, useRef } from 'react';
import Dropzone, { useDropzone } from 'react-dropzone';
import { Link } from 'react-router-dom';
import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop } from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'
import canvasPreview from '../../../utils/canvasPreview';
import { useDebounceEffect } from '../../../utils/useDebounceEffect';

const mapApiJs = 'https://maps.googleapis.com/maps/api/js';
const apiKey = process.env.REACT_APP_GMAP_API_KEY;

function loadAsyncScript(src) {
    return new Promise(resolve => {
        const script = document.createElement("script");
        Object.assign(script, {
            type: "text/javascript",
            async: true,
            src
        });
        script.addEventListener("load", () => resolve(script));
        document.head.appendChild(script);
    })
}

export default function FoldForm({}){
    const [tab, setTab] = useState(1);
    const [switching, setSwitching] = useState(false);
    const [images, setImages] = useState([]);
    const [categories, setCategories] = useState([{quantity: 0, price: 0, name: "Catégorie 1"}]);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [amount, setAmount] = useState(0);
    const [day, setDay] = useState(null);
    const [month, setMonth] = useState(null);
    const [year, setYear] = useState(null);
    const [hour, setHour] = useState(null);
    const [minute, setMinute] = useState(null);
    const [progress, setProgress] = useState(0);
    const [created, setCreated] = useState(false);
    const [tab1Errors, setTab1Errors] = useState({
        name: true,
        amount: true,
        day: true,
        month: true,
        year: true,
        hour: true,
        minute: true,
    });
    const [tab2Errors, setTab2Errors] = useState({
        images: true
    });
    const [touched, setTouched] = useState({
        name: false,
        amount: false,
        day: false,
        month: false,
        year: false,
        hour: false,
        minute: false,
        images: false
    });
    const [crop, setCrop] = useState<Crop>({
        unit: "%",
        x: 50,
        y: 50,
        width: 25,
        height: 25
    });
    const [modal, setModal] = useState(false);
    const [currentImgSrc, setCurrentImgSrc] = useState(null);
    const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
    const addressRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const imgRef = useRef(null);
    const [scanStart, setScanStart] = useState<any>(15);
    const [scale, setScale] = useState(1);
    const [categorySelected, setCategorySelected] = useState(0);

    useDropzone({
        accept: {
            'image/jpeg': [],
            'image/png': []
        }
    })

    function addCategory(){
        setCategories([
            ...categories,
            {
                quantity: 0,
                price: 0,
                name: `Catégorie ${categories.length + 1}`
            }
        ]);
    }

    // FORM SETTERS

    function setEventName(name: string){
        if(!name){
            setTab1Errors({
                ...tab1Errors,
                name: true
            });
            return;
        }

        setTab1Errors({
            ...tab1Errors,
            name: false
        });
        setName(name);
    }

    function setEventDay(day){
        if(!day || day < 1 || day > 31 || isNaN(day)){
            setTab1Errors({
                ...tab1Errors,
                day: true
            });
            return;
        }
        setTab1Errors({
            ...tab1Errors,
            day: false
        });
        setDay(day);
    }

    function setEventMonth(month){
        if(!month || month < 1 || month > 12 || isNaN(month)){
            setTab1Errors({
                ...tab1Errors,
                month: true
            });
            return;
        }
        setTab1Errors({
            ...tab1Errors,
            month: false
        });
        setMonth(month);
    }

    function setEventYear(year){
        if(!year || year < new Date().getFullYear() || isNaN(year)){
            setTab1Errors({
                ...tab1Errors,
                year: true
            });
            return;
        }
        setTab1Errors({
            ...tab1Errors,
            year: false
        });
        setYear(year);
    }

    function setEventHour(hour){
        if(!hour || hour < 0 || hour > 23 || isNaN(hour)){
            setTab1Errors({
                ...tab1Errors,
                hour: true
            });
            return;
        }
        setTab1Errors({
            ...tab1Errors,
            hour: false
        });
        setHour(hour);
    }

    function setEventMinute(minute){
        if(!minute || minute < 0 || minute > 59 || isNaN(hour)){
            setTab1Errors({
                ...tab1Errors,
                minute: true
            });
            return;
        }
        setTab1Errors({
            ...tab1Errors,
            minute: false
        });
        setMinute(minute);
    }

    function setEventAmount(amount){
        if(!amount || amount < 1 || isNaN(amount)){
            setTab1Errors({
                ...tab1Errors,
                amount: true
            });
            return;
        }
        setTab1Errors({
            ...tab1Errors,
            amount: false
        });
        setAmount(amount);
    }

    function locationToAddress(autocomplete){
        const { address_components } = autocomplete.getPlace();
        console.log(address_components);
        const address = `${address_components[0]?.long_name || ""} ${address_components[1]?.short_name || ""} ${address_components[6]?.long_name || ""} ${address_components[2]?.long_name || ""} ${address_components[5]?.long_name || ""}`;
        setAddress(address);
    }

    function setCategoryName(index, e){
        const currentCategory = categories[index];
        currentCategory.name = e.target.value;
        categories[index] = currentCategory;
        setCategories(categories);
    }

    function setCategoryQuantity(index, e){
        const currentCategory = categories[index];
        currentCategory.quantity = e.target.value;
        categories[index] = currentCategory;
        setCategories(categories);
    }

    function setCategoryPrice(index, e){
        const currentCategory = categories[index];
        currentCategory.price = e.target.value;
        categories[index] = currentCategory;
        setCategories(categories);
    }

    // END FORM SETTERS

    function removeCategory(index){
        const categoriesUpdated = categories.splice(index, 1);
        setCategories([...categories])
    }

    function prevTab(){
        if(tab > 1){
            setSwitching(true);
            setTimeout(() => {
                setTab(tab - 1);
                setSwitching(false);
            }, 250);
        }
    }

    function nextTab(){
        if(tab == 1){
            const dateString = `${year}-${month}-${day} ${hour}:${minute}`;
            const timestamp = new Date(dateString).getTime()
            if(timestamp / 1000 < Date.now() / 1000){
                setTab1Errors({
                    ...tab1Errors,
                    day: true,
                    month: true,
                    year: true,
                    hour: true,
                    minute: true
                });
                return;
            }
        }
        setSwitching(true);
        setTimeout(() => {
            setTab(tab + 1);
            setSwitching(false);
        }, 250);
    }

    function handleDrop(acceptedFiles, index){
        setModal(true);
        setTouched({...touched, images: true});
        const [image] = acceptedFiles;
        console.log(image);
        setCurrentImgSrc(URL.createObjectURL(image));
        let newFiles = images;
        if(!newFiles[categorySelected]){
            newFiles[categorySelected] = [];
        }
        newFiles[categorySelected][index] = image;
        setImages(newFiles);
        setTab2Errors({...tab2Errors, images: false});
        setCrop(undefined);
    }

    async function onImageLoad(event: any) {
        const {width, height} = event.currentTarget;
        setCrop(centerCrop(
            makeAspectCrop(
                {
                    unit: '%',
                    width: 100
                },
                9/16,
                width,
                height
            ),
            width,
            height
        ));
    }

    async function saveCropImage(){
        console.log(images);
        const currentImage = images[categorySelected][images[categorySelected].length - 1];
        const cropped = previewCanvasRef.current.toDataURL("image/jpeg");
        const croppedFile = await fetch(cropped)
        .then((response) => {
            return response.arrayBuffer();
        })
        .then((buf) => {
            return new File([buf], currentImage.path ,{type:currentImage.type});
        });
        var imagesArray = images;
        imagesArray[categorySelected][images[categorySelected].length - 1] = croppedFile;
        setImages(imagesArray);
        setModal(false);
    }

    async function cancelImageUpload(){
        const currentImages = images;
        console.log(currentImages);
        currentImages.pop();
        setImages(currentImages);
        setModal(false);
    }

    async function handleSubmit(event){
        event.preventDefault();
        nextTab();
        const dateString = `${year}-${month}-${day} ${hour}:${minute}`;
        const timestamp = new Date(dateString).getTime()

        setProgress(50);

        // const eventResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/generateTickets`, {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         eventName: name,
        //         eventAddress: address,
        //         eventAmount: amount,
        //         eventTimestamp: timestamp,
        //         eventScanStart: scanStart,
        //         eventCategories: categories
        //     })
        // });

        // @TODO: SEND ACCOUNT INFORMATIONS TO CURRENT USER EMAIL

        const eventDatas = await fetch(`${process.env.REACT_APP_BACKEND_URL}/saveEvent`, {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userAddress: localStorage.getItem("userAddress"),
                eventName: name
            })
        })
        .then(async (response) => {
            const json = await response.json();
            return json.datas;
        })
        .catch((err) => {
            console.log(err);
        });

        console.log(eventDatas);
        // @TODO: ADD EVENT DATAS IN DATABASE

        const imagesFormData = new FormData();

        imagesFormData.append('userAddress', localStorage.getItem("userAddress"));
        imagesFormData.append('eventId', eventDatas.eventId);
        images.forEach((category: any, index: any) => {
            category.forEach((image: any) => {
                console.log(image);
                imagesFormData.append(`${index}`, image);
            })
        });

        const imagesResponse = await fetch(`${process.env.REACT_APP_BACKEND_URL}/saveImage`, {
            method: 'POST',
            body: imagesFormData
        });

        setProgress(100);
        setCreated(true);
    }

    const initMapScript = () => {
        if(window.google){
            return Promise.resolve();
        }

        const src = `${mapApiJs}?key=${apiKey}&libraries=places&v=weekly`;
        return loadAsyncScript(src);
    };

    const initAutocomplete = () => {
        if(!addressRef.current) return;

        const autocomplete = new window.google.maps.places.Autocomplete(addressRef.current);
        autocomplete.setFields(["address_component", "geometry"]);
        autocomplete.addListener("place_changed", () => locationToAddress(autocomplete));
    }

    useEffect(() => {
        initMapScript().then(() => initAutocomplete())
    }, [tab1Errors]);

    useDebounceEffect(
        async () => {
          if (
            completedCrop?.width &&
            completedCrop?.height &&
            imgRef.current &&
            previewCanvasRef.current
          ) {
            // We use canvasPreview as it's much faster than imgPreview.
            canvasPreview(
              imgRef.current,
              previewCanvasRef.current,
              completedCrop,
              scale,
              0,
            )
          }
        },
        100,
        [completedCrop, scale, 0],
    );
    
    return (
        <div className={`overflow-y-hidden w-full h-full ${tab < 4 ? "bg-[#200E32]" : created ? "bg-[#85DBDB]" : "bg-[#8E71AC]"} pt-[30px] transition-opacity transition-colors duration-500 flex flex-col`}>
            {tab < 4 &&
                <>
                    <div className="w-full flex justify-between pl-[60px] pr-[120px] items-center mb-[10px]">
                        <img src="/logo.png" />
                        <img src="/pp.png" className="rounded-full h-[75px]"/>
                    </div>
                    <div className="w-full px-[115px] pb-[45px] flex-1">
                        <div className="w-full h-full bg-white rounded-[51px] flex flex-col px-[60px] pt-[20px] max-h-full">
                            <div className="h-[15%] w-full text-center text-[20px]">
                                <div className="mb-[20px] font-medium">
                                    {tab}/3
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="w-1/5">
                                        <svg onClick={prevTab} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="cursor-pointer w-6 h-6 hover:scale-125">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                                        </svg>
                                    </div>
                                    <div className="flex justify-between flex-1">
                                        <div className={`h-[5px] w-[32%] rounded-full ${tab > 0 ? "bg-[#8E71AC]" : "bg-[#9DAAB6]"}`}></div>
                                        <div className={`h-[5px] w-[32%] rounded-full ${tab > 1 ? "bg-[#8E71AC]" : "bg-[#9DAAB6]"}`}></div>
                                        <div className={`h-[5px] w-[32%] rounded-full ${tab > 2 ? "bg-[#8E71AC]" : "bg-[#9DAAB6]"}`}></div>
                                    </div>
                                    <div className="w-1/5">
                                    </div>
                                </div>
                            </div>
                            <form onSubmit={handleSubmit} className="h-[70%] w-full max-h-[70%] block">
                            { tab == 1 &&
                                <div className={`flex h-full ${switching ? "opacity-0" : "opacity-100"} transition-opacity duration-250`}> 
                                    <div className="w-7/12 pr-[100px] py-[30px] h-full flex flex-col justify-between">
                                        <div className="mb-[10px] relative">
                                            <label className="mb-[15px] block font-medium" htmlFor="name">Nom de l'événement</label>
                                            <input onBlur={() => {setTouched({...touched, name: true})}} onChange={(e) => { setEventName(e.target.value) }} name="name" type="text" className={`border-2 border-transparent px-[30px] font-medium block w-5/6 bg-[#F2F3F4] h-[59px] rounded-[16px] ${tab1Errors.name && touched.name ? "!border-red-600" : ""}`}/>
                                            {(tab1Errors.name && touched.name) &&
                                               <div className="text-red-600 text-xs absolute top-[20px]">
                                                   Le nom de l'évènement ne peut pas être vide
                                                </div>
                                            }
                                        </div>
                                        <div className="mb-[10px]">
                                            <label className="mb-[15px] block font-medium">Adresse</label>
                                            <input ref={addressRef} type="text" className={`border-2 border-transparent px-[30px] font-medium block w-5/6 bg-[#F2F3F4] h-[59px] rounded-[16px]`}/>
                                        </div>
                                        <div className="mb-[10px] relative flex gap-10">
                                            <div className="w-1/2">
                                                <label className="mb-[15px] inline-block font-medium" htmlFor="day">Date</label>
                                                <div className="flex gap-5">
                                                    <input maxLength={2} onBlur={() => {setTouched({...touched, day: true})}} onChange={(e) => {setEventDay(e.target.value)}} name="day" placeholder="25" type="text" className={`border-2 border-transparent px-[30px] font-medium block w-1/4 bg-[#F2F3F4] h-[59px] rounded-[16px] ${tab1Errors.day && touched.day ? "!border-red-600" : ""}`}/>
                                                    <input maxLength={2} onBlur={() => {setTouched({...touched, month: true})}} onChange={(e) => {setEventMonth(e.target.value)}} name="month" placeholder="12" type="text" className={`border-2 border-transparent px-[30px] font-medium block w-1/4 bg-[#F2F3F4] h-[59px] rounded-[16px] ${tab1Errors.month && touched.month ? "!border-red-600" : ""}`}/>
                                                    <input maxLength={4} onBlur={() => {setTouched({...touched, year: true})}} onChange={(e) => {setEventYear(e.target.value)}} name="year" placeholder="2023" type="text" className={`border-2 border-transparent px-[30px] font-medium block w-1/3 bg-[#F2F3F4] h-[59px] rounded-[16px] ${tab1Errors.year && touched.year ? "!border-red-600" : ""}`}/>
                                                </div>
                                                {((tab1Errors.day && touched.day) || (tab1Errors.month && touched.month) || (tab1Errors.year && touched.year)) &&
                                                    <div className="text-red-600 text-xs absolute top-[20px]">
                                                        La date entrée est incorrecte
                                                    </div>
                                                }
                                            </div>
                                        </div>
                                        <div className="mb-[10px] relative flex justify-between">
                                            <div>
                                                <label className="mb-[15px] block font-medium" htmlFor="hour">Heure</label>
                                                <div className="flex items-center">
                                                    <input onBlur={() => {setTouched({...touched, hour: true})}} onChange={(e) => {setEventHour(e.target.value)}} name="hour" min="0" max="23" type="number" className={`border-2 border-transparent pl-[15px] font-medium block w-1/8 bg-[#F2F3F4] h-[59px] rounded-[16px] ${tab1Errors.hour && touched.hour ? "!border-red-600" : ""}`}></input>
                                                    <div className="font-medium text-[20px] mx-2">:</div>
                                                    <input onBlur={() => {setTouched({...touched, minute: true})}} onChange={(e) => {setEventMinute(e.target.value)}} name="minutes" min="0" max="59" type="number" className={`border-2 border-transparent pl-[15px] font-medium block w-1/8 bg-[#F2F3F4] h-[59px] rounded-[16px] ${tab1Errors.minute && touched.minute ? "!border-red-600" : ""}`}></input>
                                                </div>
                                                {((tab1Errors.hour && touched.hour) || (tab1Errors.minute && touched.minute)) &&
                                                <div className="text-red-600 text-xs absolute top-[20px]">
                                                    L'heure entrée est incorrecte
                                                    </div>
                                                }
                                            </div>
                                            <div>
                                                <label className="mb-[15px] inline-block font-medium" htmlFor="day">Début du scan</label>
                                                <div>
                                                    <select onChange={(e) => setScanStart(e.target.value)}  className={`border-2 border-transparent px-[15px] font-medium inline-block mr-4 w-1/8 bg-[#F2F3F4] h-[59px] rounded-[16px]`}>
                                                        <option selected value="15">15</option>
                                                        <option value="30">30</option>
                                                        <option value="45">45</option>
                                                        <option value="60">60</option>
                                                    </select>
                                                    <span>min. avant l'évènement</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mb-[10px] relative">
                                            <label className="mb-[15px] block font-medium" htmlFor="amount">Nombre de SmartTickets</label>
                                            <input name="amount" id="amount" onBlur={() => {setTouched({...touched, amount: true})}} onChange={(e) => { setEventAmount(parseInt(e.target.value)) }} type="text" className={`border-2 border-transparent px-[30px] font-medium block w-1/6 bg-[#F2F3F4] h-[59px] rounded-[16px] ${tab1Errors.amount && touched.amount ? "!border-red-600" : ""}`}/>
                                            {(tab1Errors.amount && touched.amount) &&
                                                <div className="text-red-600 text-xs absolute top-[20px]">
                                                   Le montant entré est incorrect
                                                </div>
                                            }
                                        </div>
                                    </div>
                                    <div className="w-5/12 pt-[30px] max-h-full">
                                        <div className="overflow-scroll h-[400px] relative">
                                            <table className="w-full table-auto border-separate border-spacing-y-2">
                                                <thead className="h-[40px] text-left sticky top-0 bg-white">
                                                    <tr>
                                                        <th className="pl-[30px]">
                                                            Nom de la catégorie
                                                        </th>
                                                        <th className="pl-[30px]">
                                                            Quantité
                                                        </th>
                                                        <th className="pl-[30px]">
                                                            Prix
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody className="">
                                                    {categories && 
                                                        categories.map((category, index) => {
                                                            return(
                                                                <tr className="w-[90%] h-[65px]" key={index}>
                                                                    <td className="h-[65px] bg-[#F2F3F4] rounded-l-[16px] mt-2">
                                                                        <input onChange={(e) => {setCategoryName(index, e)}} defaultValue={category.name} type="text" className="bg-transparent w-full h-[65px] px-[30px] font-medium"></input>
                                                                    </td>
                                                                    <td className="h-[65px] bg-[#F2F3F4]">
                                                                        <input onChange={(e) => {setCategoryQuantity(index, e)}} defaultValue={category.quantity} type="text" className="bg-transparent w-full h-[65px] px-[30px] font-medium"></input>
                                                                    </td>
                                                                    <td className="h-[65px] bg-[#F2F3F4] rounded-r-[16px]">
                                                                        <input onChange={(e) => {setCategoryPrice(index, e)}} defaultValue={category.price} type="text" className="bg-transparent w-full h-[65px] px-[30px] font-medium"></input>
                                                                    </td>
                                                                    {index == 0 &&
                                                                        <td className="pl-2">
                                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-white">
                                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                                            </svg>
                                                                        </td>
                                                                    }
                                                                    <td className="pl-2" onClick={() => { removeCategory(index) }}>
                                                                        {index > 0 && 
                                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-600 cursor-pointer">
                                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                                                </svg>
                                                                        }
                                                                    </td>
                                                                </tr>
                                                            );
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                            <div className="text-[8px] mt-[4px]">Ne peut pas depasser le nombre total de smart tickets</div>
                                            <div className="w-full flex justify-center">
                                                <button type="button" className="bg-[#8E71AC] text-white w-[58px] h-[54px] rounded-2xl text-[36px] flex items-center justify-center mr-[16px]" onClick={addCategory}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }

                            { tab == 2 && 
                                <div className={`flex h-full ${switching ? "opacity-0" : "opacity-100"} transition-opacity duration-250 w-3/4 mx-auto flex-col`}>
                                    
                                    <div className="flex flex-1">
                                        <div className="w-1/4 h-full pt-12 mr-12">
                                            <div className="pl-4 font-medium">
                                                SmartTicket Design
                                            </div>
                                            <div className="pl-4 text-[8px] font-medium">
                                                Crée vos SmartTickets à votre image.
                                            </div>
                                            <div className="mt-6">
                                                { categories && categories.map((element, index) => {
                                                    return (
                                                        <div onClick={() => setCategorySelected(index)} key={index} className={`bg-[#F2F3F4] rounded-[16px] mb-[10px] h-[60px] w-[200px] flex items-center justify-center font-medium cursor-pointer ${categorySelected == index ? "!bg-[#200E32] text-white" : "" }`}>{element.name}</div>
                                                    );
                                                })
                                                }
                                            </div>
                                        </div>
                                        <div className="flex-1 flex items-center">
                                            { (images[categorySelected] && images[categorySelected].length > 0) && 
                                                <>
                                                    {
                                                        images[categorySelected].map((image, index) => {
                                                            return (
                                                                <img key={index} src={URL.createObjectURL(image)} className="w-[225px] h-[400px] rounded-[29px] border border-gray-600 mr-6"/>
                                                            )
                                                        })
                                                    }
                                                    <Dropzone
                                                        onDrop={(acceptedFiles) => {
                                                            handleDrop(acceptedFiles, images.length);
                                                        }}
                                                        multiple={false}
                                                    >
                                                        {({getRootProps, getInputProps}) => (
                                                            <div {...getRootProps({className: 'bg-[#FFFFFF] p-[20px] text-[#FFFFF] h-[150px] cursor-pointer'})}>
                                                                <input {...getInputProps()} className="cursor-pointer"/>
                                                                <div className="bg-[#8E71AC] rounded-[16px] w-[54px] h-[56px] flex items-center justify-center text-white cursor-pointer">
                                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Dropzone>
                                                </>
                                            }
                                            {(!images[categorySelected] || images[categorySelected].length == 0) && 
                                                <Dropzone
                                                    onDrop={(acceptedFiles) => {
                                                        handleDrop(acceptedFiles, 0);
                                                    }}
                                                    multiple={false}
                                                    accept="image/*"
                                                >
                                                    {({getRootProps, getInputProps}) => (
                                                        <div {...getRootProps({className: 'bg-[#FFFFFF] p-[20px] text-[#FFFFF] h-[150px] cursor-pointer'})}>
                                                            <input accept="image/*" {...getInputProps()} />
                                                            <div className="bg-[#8E71AC] rounded-[16px] w-[54px] h-[56px] flex items-center justify-center text-white cursor-pointer">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    )}
                                                </Dropzone>
                                            }
                                        </div>
                                    </div>

                                </div>
                            }

                            { tab == 3 && 
                                <div className={`flex h-full ${switching ? "opacity-0" : "opacity-100"} transition-opacity duration-250 w-3/4 mx-auto flex-col`}>
                                    <div className="font-medium mb-6">
                                        Règles du SmartTicket
                                    </div>
                                    <div className="text-[8px] font-medium">
                                        Pourcentage des revenues généré par le marché secondaire 
                                    </div>
                                    <div className="w-7/12 pr-[100px] py-[30px] h-full flex flex-col justify-between">
                                        <div className="mb-[10px]">
                                            <label className="mb-[15px] block font-medium" htmlFor="name">Pourcentage sur les revenus</label>
                                            <div className="flex">
                                                <input name="name" type="text" value="Nom du wallet bénéficiaire" className="px-[30px] font-medium block w-full bg-[#F2F3F4] h-[59px] rounded-l-[16px]"/>
                                                <div className='relative'>
                                                    <input name="percentage" type="number" value={5} className="px-[30px] rounded-r-[16px] bg-[#F2F3F4] h-[59px]" />
                                                    <span className="absolute top-[50%] right-[50px] translate-y-[-50%] font-medium">%</span>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="mb-[10px]">
                                            <label className="mb-[15px] block font-medium" htmlFor="day">TBD</label>
                                            <input name="date" type="text" className="font-medium block w-full bg-[#F2F3F4] h-[59px] rounded-[16px]"/>
                                        </div>
                                        <div className="mb-[10px]">
                                            <label className="mb-[15px] block font-medium" htmlFor="day">TBD</label>
                                            <input name="date" type="text" className="font-medium block w-full bg-[#F2F3F4] h-[59px] rounded-[16px]"/>
                                        </div> */}
                                    </div>
                                </div>
                            }
                                <div className="h-[15%] w-full flex items-center justify-end">
                                    {tab == 1 && 
                                        <button type="button" disabled={Object.values(tab1Errors).includes(true)} onClick={nextTab} className="text-white text-[18px] bg-[#8E71AC] rounded-[9px] h-[80%] w-[300px] font-medium disabled:opacity-75">
                                            Passer à l'étape suivante
                                        </button>
                                    }
                                    {tab == 2 && 
                                        <button type="button" disabled={Object.values(tab2Errors).includes(true)} onClick={nextTab} className="text-white text-[18px] bg-[#8E71AC] rounded-[9px] h-[80%] w-[300px] font-medium disabled:opacity-75">
                                            Passer à l'étape suivante
                                        </button>
                                    }
                                    {tab == 3 && 
                                        <button type="submit" className="text-white text-[18px] bg-[#8E71AC] rounded-[9px] h-[80%] w-[300px] font-medium disabled:opacity-75">
                                            Générer mes tickets
                                        </button>
                                    }
                                </div>
                            </form>
                        </div>
                    </div>
                </>
            }
            {(tab == 4 && !created) && 
                <>
                    <div className="w-full flex justify-between pl-[60px] pr-[120px] items-center mb-[0px]">
                        <img src="/logo.png" />
                    </div>
                    <div className="w-full px-[115px] pb-[90px] flex-1 flex flex-col items-center justify-center text-white">
                        <img src="/rocket.png" className="w-1/7"></img>
                        <div className="text-xs">
                            Loading.......
                        </div>
                        <div className="text-[24px] uppercase w-1/5 text-center mt-[20px]">
                            SmartTickets en cours de génération
                        </div>
                        <div className="w-1/5 bg-[#979797] h-[10px] rounded-full mt-[10px] relative">
                            <div style={{width: `${progress}%`}} className={`absolute bg-[#1CF28C] left-0 top-0 bottom-0 rounded-full transition-all duration-500 ease-in-out`}></div>
                        </div>
                    </div>
                </>
            }
            {created && 
                <>
                    <div className="w-full flex justify-between pl-[60px] pr-[120px] items-center mb-[0px]">
                        <img src="/logo.png" />
                    </div>
                    <div className="w-full px-[115px] pb-[90px] flex-1 flex flex-col items-center justify-center text-white">
                        <img src="/icons/Check.png" className="w-[200px]"></img>
                        <div className="text-[24px] uppercase w-1/5 text-center mt-[20px]">
                            Vos SmartTickets ont été générés !
                        </div>
                        <Link to="/dashboard" className="flex items-center justify-center mt-6 text-white text-[18px] bg-[#8E71AC] rounded-[16px] h-[50px] w-[300px] font-medium">Allons-y !</Link>
                    </div>
                </>
            }
            {modal && 
                <div className="modal w-full h-full bg-black/30 absolute inset-0 backdrop-blur-sm flex justify-center items-center">
                    <div className="w-2/3 h-2/3 bg-[#e0e0e0] rounded-[50px] shadow-sm p-6 relative">
                        <div className="flex justify-end items-center">
                            <button type="button" className="text-[#8E71AC] bg-transparent hover:scale-105 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" onClick={cancelImageUpload}>
                                <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        <div className="flex gap-5">
                            <ReactCrop
                                crop={crop}
                                onChange={(_, percentCrop) => setCrop(percentCrop)}
                                onComplete={(c) => setCompletedCrop(c)}
                                aspect={9/16}
                            >
                                <img style={{ transform: `scale(${scale})`, transition: 'all 0.2s ease-in-out'}} onLoad={onImageLoad} ref={imgRef} src={currentImgSrc} className="min-w-[300px]" />
                            </ReactCrop>
                            <div>
                                {!!completedCrop && (
                                    <canvas
                                        ref={previewCanvasRef}
                                        style={{
                                            border: '1px solid black',
                                            objectFit: 'contain',
                                            width: completedCrop.width,
                                            height: completedCrop.height,
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                        <button onClick={() => { setScale(scale + 0.1); }}>+</button>
                        <button onClick={() => { setScale(scale - 0.1); }}>-</button>
                        <button type="button" className="bg-[#8E71AC] text-white px-4 py-1 rounded-md absolute bottom-8 right-16" onClick={saveCropImage}>Enregistrer</button>
                    </div>
                </div>
            }
        </div>
    );
}