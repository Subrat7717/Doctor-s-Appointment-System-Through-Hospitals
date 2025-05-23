import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AdminContext } from '../../context/AdminContext';
import { AppContext } from '../../context/AppContext';
import { ImagePlus, Building2, MapPin, Phone } from 'lucide-react';

const AddHospital = () => {
    const initialData = {
        name: '',
        address: '',
        contact: '',
        //specialties: '',
        //facilities: '',
        //rating: '',
    };

    const [hospitalImg, setHospitalImg] = useState(null);
    const { backendUrl } = useContext(AppContext);
    const { aToken } = useContext(AdminContext);
    const [formData, setFormData] = useState(initialData);

    function handleOnChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (!hospitalImg) {
            return toast.error('Image Not Selected');
        }

        const formDataToSend = new FormData();
        formDataToSend.append('image', hospitalImg);
        formDataToSend.append('name', formData.name);
        formDataToSend.append('address', formData.address);
        formDataToSend.append('contact', formData.contact);
        //formDataToSend.append('specialties', formData.specialties);
        //formDataToSend.append('facilities', formData.facilities);
        //formDataToSend.append('rating', formData.rating);

        try {
            const { data } = await axios.post(
                backendUrl + '/api/admin/add-hospital',
                formDataToSend,
                {
                    headers: {
                        'aToken': aToken,
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            if (data.success) {
                toast.success(data.message);
                setFormData(initialData);
                setHospitalImg(null);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || error.message);
            console.error(error);
        }
    };

    return (
        <form onSubmit={onSubmitHandler} className='m-8 w-full'>
            <p className='mb-3 text-lg font-medium'>Add Hospital</p>
            <div className='bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll'>
                <div className='flex items-center gap-4 mb-8 text-gray-500'>
                    <label htmlFor='hospital-img'>
                        <img
                            className='w-16 bg-gray-100 rounded-full cursor-pointer'
                            src={hospitalImg ? URL.createObjectURL(hospitalImg) : assets.upload_area}
                            alt=''
                        />
                    </label>

                    <input
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                const validImageTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
                                if (!validImageTypes.includes(file.type)) {
                                    alert('Please upload a valid image file (JPEG, PNG, WEBP)');
                                    return;
                                }

                                setHospitalImg(file);
                            }
                        }}
                        type='file'
                        id='hospital-img'
                        hidden
                        accept='image/*'
                    />

                    <div className='flex items-center gap-2'>
                        <ImagePlus size={20} />
                        <p>
                            Upload hospital <br /> picture
                        </p>
                    </div>
                </div>



                <div className='flex flex-col lg:flex-row items-start gap-10 text-gray-600'>
                    <div className='w-full lg:flex-1 flex flex-col gap-4'>
                        <div className='flex-1 flex flex-col gap-1'>
                            <label className='flex items-center gap-2'>
                                <Building2 size={16} /> Hospital Name
                            </label>
                            <input
                                onChange={handleOnChange}
                                name='name'
                                value={formData.name}
                                className='border rounded px-3 py-2'
                                type='text'
                                placeholder='Hospital Name'
                                required
                                pattern='^[A-Za-z]+$'
                                title='Only one word allowed. Letters only. No numbers or spaces.'
                            />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <label className='flex items-center gap-2'>
                                <MapPin size={16} /> Address
                            </label>
                            <input
                                onChange={handleOnChange}
                                name='address'
                                value={formData.address}
                                className='border rounded px-3 py-2'
                                type='text'
                                placeholder='Address'
                                required
                            />
                        </div>

                        <div className='flex-1 flex flex-col gap-1'>
                            <label className='flex items-center gap-2'>
                                <Phone size={16} /> Contact
                            </label>
                            <input
                                onChange={handleOnChange}
                                name='contact'
                                value={formData.contact}
                                className='border rounded px-3 py-2'
                                type='tel'
                                placeholder='Contact Number'
                                required
                                pattern='^[6-9]\d{9}$'
                                title='Enter a valid 10-digit mobile number starting with 6, 7, 8, or 9'
                                maxLength='10'
                            />
                        </div>
                    </div>
                </div>

                <button
                    type='submit'
                    className='bg-primary px-10 py-3 mt-4 text-white rounded-full'
                >
                    Add Hospital
                </button>
            </div>
        </form>
    );
};

export default AddHospital;
