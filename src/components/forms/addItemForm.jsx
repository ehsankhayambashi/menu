import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "../formElement/input";
import Checkbox from "../formElement/checkbox";
import File from "../formElement/file";
import itemService from "../../services/itemService";
import categoryService from "../../services/categoryService";
import image from "../../services/imageService";
import { removeDate } from "../../util/utils";
import ReactSelect from "../formElement/reactSelect";

function AddItemForm() {
  const params = useParams();
  const navigateTo = useNavigate();
  const itemId = params.id;
  const [item, setItem] = useState(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const result = await categoryService.get();
        setCategories(result);
      } catch (error) {
        console.log(error);
        toast.error("آیدی دسته بندی اشتباه است");
      }
    }

    async function fetchItem(itemId) {
      if (itemId === "add") return null;
      try {
        const result = await itemService.getItemById(itemId);
        const imageItem = await image.get(result.image);
        result.image = imageItem;
        setItem(result);
      } catch (error) {
        console.log(error);
        toast.error("آیدی آیتم اشتباه است");
      }
    }
    fetchCategories();
    fetchItem(itemId);
  }, []);
  const itemSchema = Yup.object({
    name: Yup.string().required("یک نام برای آیتم انتخاب کنید"),
    image: Yup.mixed().test(
      "fileSize",
      "حجم عکس بالاست,حداکثر سایز ۱ مگابایت",
      (file) => {
        if (file) {
          return file.size <= 1100000;
        } else {
          return true;
        }
      }
    ),
    isPublished: Yup.boolean().optional(),
    isOver: Yup.boolean().optional(),
    materials: Yup.string().optional(),
    price: Yup.number()
      .nullable(true)
      .typeError("قیمت را به لاتین وارد کنید")
      .required("قیمت آیتم را وارد کنید"),
    category: Yup.object({
      value: Yup.string(),
      label: Yup.string(),
    }).required("برای آیتم یک دسته بندی انتخاب کنید"),
  });
  async function getImage(imageItem) {
    if (imageItem === undefined) {
      const sampleImage = await image.get("uploads/no-image.jpeg");
      return sampleImage;
    }
    return imageItem;
  }
  async function postItem(data, onSubmitProps) {
    // if (data.image && data.image.size < 1024 * 1024) {
    // console.log(await getImage(data.image));
    onSubmitProps.setSubmitting(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("image", await getImage(data.image));
    formData.append("isPublished", data.isPublished);
    formData.append("isOver", data.isOver);
    formData.append("materials", data.materials);
    formData.append("price", data.price);
    formData.append("category", data.category.value);
    console.log(formData);
    try {
      await itemService.post(formData);
      toast.success("آیتم با موفقیت ثبت شد");
    } catch (err) {
      toast.error("خطایی رخ داده");
    }
    // }
  }
  async function updateItem(data, onSubmitProps) {
    console.log(item);
    if (data.image && data.image.size < 1024 * 1024) {
      onSubmitProps.setSubmitting(true);
      const newItemImage = removeDate(data.image.name);
      const oldItemImage = removeDate(item.image.name);
      const itemData = {};
      itemData["name"] = data.name;
      itemData["isPublished"] = data.isPublished;
      itemData["isOver"] = data.isOver;
      itemData["materials"] = data.materials;
      itemData["price"] = data.price;
      itemData["category"] = data.category.value;
      if (newItemImage === oldItemImage) {
        itemData["image"] = `uploads/${data.image.name}`;
      } else {
        //axe jadid upload shode
        const formData = new FormData();
        formData.append("image", data.image);
        const newImagePath = await image.post(formData);
        itemData["image"] = newImagePath;
      }
      try {
        await itemService.update(itemId, itemData);
        toast.success("آیتم به روز رسانی شد");
      } catch (err) {
        toast.error("خطایی رخ داده");
      }
    }
  }
  function getItemCategory(cats, catId) {
    const findCat = cats.find((cat) => cat._id === catId);
    const category = {};
    category["value"] = findCat._id;
    category["label"] = findCat.name;
    return category;
  }
  return (
    <Formik
      initialValues={{
        name: item ? item.name : "",
        image: item ? item.image : undefined,
        isPublished: item ? item.isPublished : true,
        isOver: item ? item.isOver : false,
        materials: item ? item.materials : "",
        price: item ? item.price : "",
        category: item ? getItemCategory(categories, item.category) : "",
      }}
      enableReinitialize
      validationSchema={itemSchema}
      onSubmit={async (data, onSubmitProps) => {
        if (item) {
          updateItem(data, onSubmitProps);
          navigateTo("/dashboard/item");
        } else {
          await postItem(data, onSubmitProps);
          data.name = "";
          data.image = undefined;
          data.price = "";
          data.materials = "";
        }
        onSubmitProps.setSubmitting(false);
      }}
    >
      {(formik) => (
        <div className="container-sm">
          <h4>آیتم</h4>
          <Form>
            <Input name="name" type="text" label="نام آیتم" column="نام" />
            <Input
              name="materials"
              type="text"
              label="محتویات آیتم"
              column="محتویات"
            />
            <Input name="price" type="text" label="قیمت" column="قیمت" />
            <ReactSelect
              name="category"
              label="انتخاب دسته بندی"
              options={categories}
              setFieldValue={formik.setFieldValue}
            />
            <File
              image={formik.values.image}
              name="image"
              setFieldValue={formik.setFieldValue}
            />
            <Checkbox
              name="isPublished"
              label="نمایش داده شود"
              column="نمایش"
            />
            <Checkbox name="isOver" label="تمام شده" column="وضعیت" />
            <button
              className="btn btn-primary mt-3"
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting}
            >
              ثبت
            </button>
          </Form>
        </div>
      )}
    </Formik>
  );
}

export default AddItemForm;
