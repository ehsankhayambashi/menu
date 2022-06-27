import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "../formElement/input";
import Checkbox from "../formElement/checkbox";
import File from "../formElement/file";
import category from "../../services/categoryService";
import image from "../../services/imageService";
import { removeDate } from "../../util/utils";

function AddCategoryForm() {
  const params = useParams();
  const navigateTo = useNavigate();
  const catId = params.id;
  const [cat, setCat] = useState(null);

  useEffect(() => {
    async function fetchData(catId) {
      if (catId === "add") return null;
      try {
        const result = await category.getById(catId);
        const imageCat = await image.get(result.image);
        result.image = imageCat;
        setCat(result);
      } catch (error) {
        console.log(error);
        toast.error("آیدی دسته بندی اشتباه است");
      }
    }
    fetchData(catId);
  }, []);

  const categorySchema = Yup.object({
    name: Yup.string().required("یک نام برای دسته بندی انتخاب کنید"),
    isPublished: Yup.boolean().optional(),
    image: Yup.mixed()
      .test("fileSize", "حجم عکس بالاست,حداکثر سایز ۱ مگابایت", (file) => {
        if (file) {
          return file.size <= 1100000;
        } else {
          return true;
        }
      })
      .required("یک عکس برای دسته بندی انتخاب کنید")
      .test(
        "fileType",
        "Incorrect file type",
        (file) =>
          file && ["image/png", "image/jpg", "image/jpeg"].includes(file.type)
      ),
  });
  async function postCategory(data, onSubmitProps) {
    if (data.image && data.image.size < 1024 * 1024) {
      onSubmitProps.setSubmitting(true);
      const theCat = new FormData();
      theCat.append("name", data.name);
      theCat.append("isPublished", data.isPublished);
      theCat.append("image", data.image);
      try {
        await category.post(theCat);
        toast.success("دسته بندی با موفقیت ثبت شد");
      } catch (err) {
        toast.error("خطایی رخ داده");
      }
    }
  }
  async function updateCategory(data, onSubmitProps) {
    if (data.image && data.image.size < 1024 * 1024) {
      onSubmitProps.setSubmitting(true);
      const newCatImage = removeDate(data.image.name);
      const oldCatImage = removeDate(cat.image.name);
      const catData = {};
      if (newCatImage === oldCatImage) {
        catData["name"] = data.name;
        catData["isPublished"] = data.isPublished;
        catData["image"] = `uploads/${data.image.name}`;
      } else {
        //axe jadid upload shode
        const formData = new FormData();
        formData.append("image", data.image);
        const newImagePath = await image.post(formData);
        //update kardane category
        catData["name"] = data.name;
        catData["isPublished"] = data.isPublished;
        catData["image"] = newImagePath;
      }
      try {
        await category.update(catId, catData);
        toast.success("دسته بندی به روز رسانی شد");
      } catch (err) {
        toast.error("خطایی رخ داده");
      }
    }
  }
  return (
    <Formik
      initialValues={{
        name: cat ? cat.name : "",
        isPublished: cat ? cat.isPublished : true,
        image: cat ? cat.image : undefined,
      }}
      enableReinitialize
      validationSchema={categorySchema}
      onSubmit={async (data, onSubmitProps) => {
        if (!cat) {
          postCategory(data, onSubmitProps);
          data.name = "";
          data.image = undefined;
        }
        if (cat) {
          updateCategory(data, onSubmitProps);
          navigateTo("/dashboard/categories");
        }
        onSubmitProps.setSubmitting(false);
      }}
    >
      {(formik) => (
        <div className="container-sm">
          <h4>دسته بندی</h4>
          <Form>
            <Input name="name" type="text" label="نام دسته بندی" column="نام" />
            <File
              required={cat ? false : true}
              image={formik.values.image}
              name="image"
              setFieldValue={formik.setFieldValue}
            />
            <Checkbox
              name="isPublished"
              label="نمایش داده شود"
              column="نمایش"
            />
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

export default AddCategoryForm;
