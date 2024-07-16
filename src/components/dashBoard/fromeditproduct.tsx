
import React, { useState, ChangeEvent, useEffect } from 'react';
import {
  Formik,
  Field,
  ErrorMessage,
  Form,
  useFormikContext,
  FormikHelpers,
} from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import HSInput from '@/components/form/HSInput';
import Check from '@/assets/Check.png';
import { AppDispatch } from '@/app/store';
import {
  setName,
  setImage,
  setGallery,
  setShortDesc,
  setLongDesc,
  setCategoryId,
  setQuantity,
  setRegularPrice,
  setSalesPrice,
  setType,
  setAvailability,
  createProduct,
} from '@/features/Auth/addProductSlice';
import { uploadSingleImage, uploadGalleryImages } from '@/utils/cloudinary';

interface FormValues {
  name: string;
  shortDesc: string;
  longDesc: string;
  regularPrice: number;
  salesPrice: number;
  quantity: number;
  image: string | null;
  gallery: string[];
  tags: string[];
  categoryId: number;
  type: 'Simple' | 'Grouped' | 'Variable';
  isAvailable: boolean;
}
// eslint-disable-next-line react/function-component-definition
const MediaSection: React.FC = () => {
  const [image, setImageState] = useState<string | null>(null);
  const [gallery, setGalleryState] = useState<string[]>([]);
  const { setFieldValue } = useFormikContext<FormValues>();

  const handleimageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      try {
        const imageUrl = await uploadSingleImage(e.target.files[0]);
        setImageState(imageUrl);
        setFieldValue('image', imageUrl);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  };

  const handleGalleryImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      try {
        const newImages = await uploadGalleryImages(Array.from(e.target.files));
        setGalleryState((prevImages) => {
          const updatedImages = [...prevImages, ...newImages];
          setFieldValue('gallery', updatedImages);
          return updatedImages;
        });
      } catch (error) {
        console.error('Error uploading gallery images:', error);
      }
    }
  };
  const removeGalleryImage = (index: number) => {
    setGalleryState((prevImages) => {
      const updatedImages = prevImages.filter((_, i) => i !== index);
      setFieldValue('gallery', updatedImages);
      return updatedImages;
    });
  };

  return (
    <div className="border border-slate-700 p-3 mt-5">
      <div className="flex flex-row w-full  items-center gap-3 pb-4">
        <p className="text-[#323743] text-[18px] font-bold">Media</p>
        <img src={Check} alt="CheckImage" />
      </div>
      <p className="text-[#323743] text-[14px] font-bold mb-3">Feature Image</p>
      {image ? (
        <div>
          <div className="w-[332px] h-[187px] mb-5 p-2 bg-gray-100 border border-gray-300 rounded-lg shadow-md flex items-center justify-center">
            <img
              src={image}
              alt="Feature"
              className="object-contain bg-white w-full h-full"
            />
          </div>
          <div className="flex flex-row relative top-[-55px]  w-[332px] items-center justify-end pr-2 rounded-br-lg rounded-bl-lg pb-1 pt-1 shadow-sm bg-black bg-opacity-50">
            <button
              type="button"
              onClick={() => {
                setImage(null);
                setFieldValue('image', null);
              }}
              className="text-[11px] text-white font-bold z-20 opacity-100"
            >
              Remove
            </button>
            <label htmlFor="imageInput">
              <input
                id="imageInput"
                type="file"
                onChange={handleimageChange}
                style={{ display: 'none' }}
              />
              <button
                type="button"
                onClick={() => document.getElementById('imageInput')?.click()}
                className="border border-slate-50 text-[11px] ml-5 p-1 z-20 rounded-md font-bold outline-none text-white"
              >
                Change Image
              </button>
            </label>
          </div>
        </div>
      ) : (
        <div className="flex border border-dashed border-slate-400 text-center w-[125px] h-[125px] cursor-pointer justify-center items-center">
          <label
            htmlFor="imageInput"
            className="text-center w-full cursor-pointer"
          >
            <input
              id="imageInput"
              type="file"
              onChange={handleimageChange}
              style={{ display: 'none' }}
            />
            <span className="text-[30px] text-[#9095A1]">+</span>
          </label>
        </div>
      )}
      <ErrorMessage name="image" component="div" className="text-red-500" />

      <p className="text-white font-bold mt-4">
        <span className="text-[#323743] text-[14px]">Gallery</span>{' '}
        <span className="text-[#323743] text-[12px]">
          ({gallery.length}/4 images)
        </span>
      </p>
      <div className="flex flex-wrap gap-2">
        {gallery.map((image, index) => (
          <div
            key={`galleryImage-${index}`}
            className="relative w-[125px] h-[125px] flex justify-center items-center"
          >
            <img
              src={image}
              alt={`Gallery ${index}`}
              className="object-contain bg-white w-full h-full"
            />
            <button
              type="button"
              onClick={() => removeGalleryImage(index)}
              className="absolute top-[-10px] right-0 text-[#565D6D] rounded-full p-1"
            >
              x
            </button>
          </div>
        ))}
        {gallery.length < 4 && (
          <div className="flex border border-dashed border-slate-400 text-center w-[125px] h-[125px] cursor-pointer justify-center items-center">
            <label htmlFor="galleryImageInput">
              <input
                id="galleryImageInput"
                type="file"
                multiple
                onChange={handleGalleryImageChange}
                style={{ display: 'none' }}
              />
              <span className="text-[30px] text-[#9095A1]">+</span>
            </label>
          </div>
        )}
      </div>
      <ErrorMessage name="gallery" component="div" className="text-red-500" />
    </div>
  );
};

const validationSchema = Yup.object({
  name: Yup.string().required('Product Names is required'),
  shortDesc: Yup.string().required('Short Description is required'),
  longDesc: Yup.string().required('Long Description is required'),
  regularPrice: Yup.number().required('Regular Price is required'),
  salesPrice: Yup.number().required('Sales Price is required'),
  quantity: Yup.number().required('quantity is required'),
  image: Yup.string().required('Feature Image is required'),
  gallery: Yup.array().min(1, 'At least one gallery image is required'),
  tags: Yup.array().min(1, 'At least one tag is required'),
});

// eslint-disable-next-line react/function-component-definition
const AddProducts: React.FC = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const dispatch: AppDispatch = useDispatch();

  const addTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const formikContext = useFormikContext<FormValues>();

  useEffect(() => {
    if (formikContext) {
      const { values } = formikContext;
      setName(values.name);
      setImage(values.image);
      setGallery(values.gallery);
      setShortDesc(values.shortDesc);
      setLongDesc(values.longDesc);
      setCategoryId(values.categoryId);
      setQuantity(values.quantity);
      setRegularPrice(values.regularPrice);
      setSalesPrice(values.salesPrice);
      setTags(values.tags);
      setType(values.type);
      setAvailability(true);
    }
  }, [formikContext]);

  const handleSubmit = async (
    values: FormValues,
    actions: FormikHelpers<FormValues>
  ) => {
    try {
      await dispatch(createProduct(values));
      actions.setSubmitting(false);
      actions.resetForm();
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <Formik
      initialValues={{
        name: '',
        shortDesc: '',
        longDesc: '',
        regularPrice: 0,
        salesPrice: 0,
        quantity: 0,
        image: null,
        gallery: [],
        tags: [],
        categoryId: 0,
        type: 'Simple',
        isAvailable: true,
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <Form>
          <p className="text-[#6B7280] text-[22px]">Create new product</p>

          <div className="w-full border border-slate-100 p-2 bg-[#171A1F] flex flex-row justify-between gap-10">
            <div className="border border-slate-700 p-2 flex flex-1 flex-row">
              <div className="border border-slate-700 p-2 flex-1 flex-col">
                {/* section one */}
                <div className="border border-slate-700 p-3">
                  <div className="flex flex-row w-full  items-center gap-3 pb-3">
                    <p className="text-[#323743] text-[18px] font-bold">
                      General Information
                    </p>
                    <img src={Check} alt="CheckImage" />
                  </div>

                  <div className="flex flex-col p-1 mb-3">
                    <label
                      htmlFor="name"
                      className="text-[#424856] text-[14px] font-bold"
                    >
                      Product Title
                    </label>
                    <Field
                      name="name"
                      as={HSInput}
                      id="name"
                      placeholder="Casual Button-Down Shirt"
                      type="input"
                      text="text"
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                  <div className="flex flex-row gap-5">
                    <div className="flex flex-col w-1/2 p-1 mb-3">
                      <label
                        htmlFor="ProductCategory1"
                        className="text-[#424856] text-[14px] font-bold mb-2"
                      >
                        Type
                      </label>
                      <select
                        id="ProductCategory1"
                        title="category"
                        className="text-black text-xs md:text-sm duration-150 w-full outline-none rounded-md border-[1px]  group-hover:border-grayDark px-5 py-3"
                      >
                        <option value="variable">Variable</option>
                        <option value="simple">Simple</option>
                        <option value="grouped">Grouped</option>
                        <option value="downloadable">Downloadable</option>
                        <option value="virtual">Virtual</option>
                        <option value="external">External</option>
                      </select>
                    </div>
                    <div className="flex flex-col w-1/2 p-1 mb-3">
                      <label
                        htmlFor="ProductCategory2"
                        className="text-[#424856] text-[14px] font-bold mb-2"
                      >
                        Category
                      </label>
                      <select
                        id="ProductCategory2"
                        title="category"
                        className="text-black text-xs md:text-sm duration-150 w-full outline-none rounded-md border-[1px]  group-hover:border-grayDark px-5 py-3"
                      >
                        <option value="shirt">Shirt</option>
                        <option value="pants">Pants</option>
                        <option value="shoes">Shoes</option>
                        <option value="accessories">Accessories</option>
                        <option value="electronics">Electronics</option>
                        <option value="home_appliances">Home Appliances</option>
                        <option value="books">Books</option>
                        <option value="beauty">Beauty</option>
                        <option value="fruits_vegetables">
                          Fruits & Vegetables
                        </option>
                        <option value="dairy_products">Dairy Products</option>
                        <option value="meat_poultry">Meat & Poultry</option>
                        <option value="seafood">Seafood</option>
                        <option value="bakery">Bakery</option>
                        <option value="beverages">Beverages</option>
                        <option value="snacks">Snacks</option>
                        <option value="frozen_foods">Frozen Foods</option>
                        <option value="organic">Organic</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col p-1 mb-3">
                    <label
                      htmlFor="name"
                      className="text-[#424856] text-[14px] font-bold"
                    >
                      Short Description
                    </label>
                    <Field
                      name="shortDesc"
                      as="textarea"
                      id="shortDesc"
                      placeholder="Enter a short description"
                      className="text-black text-xs md:text-sm duration-150 w-full outline-none rounded-md border-[1px]  group-hover:border-grayDark px-5 py-3"
                      rows={5}
                    />
                    <ErrorMessage
                      name="shortDesc"
                      component="div"
                      className="text-red-500"
                    />
                  </div>

                  <div className="flex flex-col p-1 mb-3">
                    <label
                      htmlFor="longDesc"
                      className="text-[#424856] text-[14px] font-bold"
                    >
                      Long Description
                    </label>
                    <Field
                      name="longDesc"
                      as="textarea"
                      id="longDesc"
                      placeholder="Enter a long description"
                      className="text-black text-xs md:text-sm duration-150 w-full outline-none rounded-md border-[1px]  group-hover:border-grayDark px-5 py-3"
                      rows={10}
                    />
                    <ErrorMessage
                      name="longDesc"
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                </div>

                {/* section two */}
                <MediaSection />

                <div className="border border-slate-700 p-3 mt-5">
                  <div className="flex flex-row w-full  items-center gap-3 pb-3">
                    <p className="text-[#323743] text-[18px] font-bold">
                      Organization
                    </p>
                    <img src={Check} alt="CheckImage" />
                  </div>
                  <div className="flex flex-row gap-5">
                    <div className="flex flex-col w-1/2 p-1 mb-3">
                      <label
                        htmlFor="regularPrice"
                        className="text-[#424856] text-[14px] font-bold"
                      >
                        Regular Price
                      </label>
                      <Field
                        name="regularPrice"
                        as={HSInput}
                        id="regularPrice"
                        placeholder="99.99"
                        type="input"
                        text="text"
                      />
                      <ErrorMessage
                        name="regularPrice"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                    <div className="flex flex-col w-1/2 p-1 mb-3">
                      <label
                        htmlFor="salesPrice"
                        className="text-[#424856] text-[14px] font-bold"
                      >
                        Sales Price
                      </label>
                      <Field
                        name="salesPrice"
                        as={HSInput}
                        id="salesPrice"
                        placeholder="79.99"
                        type="input"
                        text="text"
                      />
                      <ErrorMessage
                        name="salesPrice"
                        component="div"
                        className="text-red-500"
                      />
                    </div>
                  </div>

                  <div className="flex flex-row gap-5">
                    <div className="flex flex-col w-1/2 p-1 mb-3">
                      <label
                        htmlFor="quantity"
                        className="text-[#424856] text-[14px] font-bold"
                      >
                        quantity
                      </label>
                      <Field
                        name="quantity"
                        as={HSInput}
                        id="quantity"
                        placeholder="1"
                        type="input"
                        text="text"
                      />
                      <ErrorMessage
                        name="quantity"
                        component="div"
                        className="text-red-500"
                      />
                    </div>

                    <div className="flex flex-col w-1/2 p-1 mb-3">
                      <label
                        htmlFor="unitMeasure"
                        className="text-[#424856] text-[14px] font-bold mb-2"
                      >
                        Unit / Measure
                      </label>
                      <select
                        id="unitMeasure"
                        title="item"
                        className="text-black text-xs md:text-sm duration-150 w-full outline-none rounded-md border-[1px]  group-hover:border-grayDark px-3 py-3"
                      >
                        <option value="item">Item</option>
                        <option value="kg">Kilogram (kg)</option>
                        <option value="g">Gram (g)</option>
                        <option value="lb">Pound (lb)</option>
                        <option value="oz">Ounce (oz)</option>
                        <option value="l">Liter (L)</option>
                        <option value="ml">Milliliter (ml)</option>
                        <option value="pack">Pack</option>
                        <option value="box">Box</option>
                        <option value="dozen">Dozen</option>
                        <option value="piece">Piece</option>
                        <option value="set">Set</option>
                        <option value="pair">Pair</option>
                        <option value="bottle">Bottle</option>
                        <option value="can">Can</option>
                        <option value="bag">Bag</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col w-[30%] bg-slate-400">
              <div className="flex flex-col p-1 mb-3 border border-slate-500">
                <label
                  htmlFor="Tags"
                  className="text-[#424856] text-[14px] font-bold"
                >
                  Tags
                </label>
                <div className="flex flex-row items-center">
                  <Field
                    type="text"
                    id="Tags"
                    className="h-full w-[70%] bg-white p-2 outline-none rounded-md"
                    value={newTag}
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setNewTag(e.target.value)
                    }
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="text-[#6D31ED] text-[14px] ml-2 outline-none"
                  >
                    + Add Tag
                  </button>
                </div>
                <ErrorMessage
                  name="tags"
                  component="div"
                  className="text-red-500 mt-1"
                />

                <div className="flex flex-row gap-2 flex-wrap border border-slate-950 pl-10 pr-10 text-center">
                  {tags.map((tag, index) => (
                    <span
                      key={index}
                      className="text-white flex flex-row items-center text-center bg-[#6D31ED] gap-3 pr-4 pl-4 rounded-sm"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="text-white text-[15px]"
                      >
                        X
                      </button>
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex flex-col items-end p-1 mt-4">
                  <button
                    type="submit"
                    className="bg-[#4A5568] text-white py-2 px-4 rounded-md"
                  >
                    Save Product
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default AddProducts;