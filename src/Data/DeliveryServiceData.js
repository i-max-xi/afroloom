import ProductsDataService from '../Services/products.services';


export const deliveryDurations = [
    "24 hours",
    "48 hours",
    "3 to 5 days",
    "5 to 7 days",
    "7 to 10 days",
];

export const AllDeliveries = async () => {
    const allDeliverySnapshot = await ProductsDataService.getAllDelivery();
    const allDeliveryData = [];
  
    allDeliverySnapshot.forEach((doc) => {
      const delivery = doc.data();
      allDeliveryData.push(delivery);
    });
  
    return allDeliveryData;
  };