import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import CheckoutWizard from '../Components/CheckoutWizard';
import Layout from '../Components/Layout';
import { Store } from '../utils/Store';

export default function ShippingScreen() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const router = useRouter();
  const { shippingAddress } = cart;
  useEffect(() => {
    setValue('fullName', shippingAddress.fullName);
    setValue('address', shippingAddress.address);
    setValue('city', shippingAddress.city);
    setValue('postalCode', shippingAddress.postalCode);
    setValue('country', shippingAddress.country);
  }, [
    setValue,
    shippingAddress.fullName,
    shippingAddress.address,
    shippingAddress.city,
    shippingAddress.postalCode,
    shippingAddress.country,
  ]);
  const submitHandler = ({ fullName, address, city, postalCode, country }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullName, address, city, postalCode, country },
    });
    Cookies.set(
      'cart',
      JSON.stringify({
        ...cart,
        shippingAddress: {
          fullName,
          address,
          city,
          postalCode,
          country,
        },
      })
    );
    router.push('/payment');
  };
  return (
    <Layout title="shipping-address">
      <CheckoutWizard activeState={1} />
      <form
        className="mx-auto max-w-screen-md"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Shipping Address</h1>
        <div className="mb-4">
          <label htmlFor="fullName" className="">
            Full Name
          </label>
          <input
            className="w-full"
            id="fullName"
            autoFocus
            {...register('fullName', {
              required: 'Please Enter your fullName',
            })}
          />
          {errors.fullName && (
            <div className="text-red-500">{errors.fullName.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="address" className="">
            Address
          </label>
          <input
            className="w-full"
            id="address"
            autoFocus
            {...register('address', {
              required: 'Please Enter your address',
              minLength: {
                value: 3,
                message: 'Address is more than 2 characters long',
              },
            })}
          />
          {errors.address && (
            <div className="text-red-500">{errors.address.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="">
            City
          </label>
          <input
            className="w-full"
            id="city"
            autoFocus
            {...register('city', {
              required: 'Please Enter your city',
              minLength: {
                value: 3,
                message: 'City is more than 2 characters long',
              },
            })}
          />
          {errors.city && (
            <div className="text-red-500">{errors.city.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="postalCode" className="">
            PostalCode
          </label>
          <input
            className="w-full"
            id="city"
            autoFocus
            {...register('postalCode', {
              required: 'Please Enter your postalCode',
              minLength: {
                value: 3,
                message: 'PostalCode is more than 2 characters long',
              },
            })}
          />
          {errors.postalCode && (
            <div className="text-red-500">{errors.postalCode.message}</div>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="country" className="">
            Country
          </label>
          <input
            className="w-full"
            id="city"
            autoFocus
            {...register('country', {
              required: 'Please Enter your country',
              minLength: {
                value: 3,
                message: 'country is more than 2 characters long',
              },
            })}
          />
          {errors.country && (
            <div className="text-red-500">{errors.country.message}</div>
          )}
        </div>
        <div className="mb-4 flex justify-between">
          <button className="primary-button">Next</button>
        </div>
      </form>
    </Layout>
  );
}
ShippingScreen.auth = true;
