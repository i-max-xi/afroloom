import React, { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import ShopPageSew from './shop/shop-page-sew';
import CustomizePage from './Customize/CustomizePage';
import Nav from '../Components/Nav';
import { useDispatch, useSelector } from 'react-redux';
import { updateLoomStore } from '../Redux/store';

const OrderToSewPage = () => {
  const { order_to_sew_category } = useSelector((state) => state.loomstore);
  const dispatch = useDispatch();

  const onChangeGrandparent = (category) => {
    dispatch(
      updateLoomStore({
        order_to_sew_category: category,
      }),
    );
  };

  const PAGEVIEW = useMemo(() => {
    switch (order_to_sew_category) {
      case ORDER_TO_SEW_CATEGORY.FROM_SHOP:
        return <ShopPageSew />;
      case ORDER_TO_SEW_CATEGORY.CUSTOMIZE:
        return <CustomizePage />;
      default:
        break;
    }
  }, [order_to_sew_category]);

  return (
    <>
      <Nav />
      <div className=" flex  items-center justify-center  text-xs md:text-sm my-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="relative flex items-center justify-center  bg-white  rounded-full w-fit border-2 border-yellow-400 shadow-md"
        >
          <motion.div
            className="absolute top-0 left-0 h-full bg-yellow-500 rounded-full"
            initial={{ width: '50%', left: 0 }}
            animate={{
              left:
                order_to_sew_category === ORDER_TO_SEW_CATEGORY.CUSTOMIZE
                  ? '50%'
                  : '0%',
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ width: '50%' }}
          />

          <button
            onClick={() => onChangeGrandparent(ORDER_TO_SEW_CATEGORY.FROM_SHOP)}
            className={`relative p-2  w-40 rounded-full transition-all font-semibold z-10 flex justify-center items-center ${
              order_to_sew_category === ORDER_TO_SEW_CATEGORY.FROM_SHOP
                ? 'text-white'
                : 'text-yellow-600'
            }`}
          >
            From Shop
          </button>

          <button
            onClick={() => onChangeGrandparent(ORDER_TO_SEW_CATEGORY.CUSTOMIZE)}
            className={`relative p-2 w-40 rounded-full transition-all font-semibold z-10 flex justify-center items-center ${
              order_to_sew_category === ORDER_TO_SEW_CATEGORY.CUSTOMIZE
                ? 'text-white'
                : 'text-yellow-600'
            }`}
          >
            3D customize
          </button>
        </motion.div>
      </div>

      <section className="min-h-screen">{PAGEVIEW}</section>
    </>
  );
};

export const ORDER_TO_SEW_CATEGORY = {
  FROM_SHOP: 'from_shop',
  CUSTOMIZE: '3D_customize',
};

export default OrderToSewPage;
