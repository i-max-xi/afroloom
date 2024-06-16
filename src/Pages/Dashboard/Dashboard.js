import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router';
import AllServices from '../../Services/usersService';
import Nav from '../../Components/Nav';

const Dashboard = () => {
    const {userID} = useParams();

    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        partner_code: "",
        earnings: 0,
    });

    const fetchuserData = async () => {
       
        
        const partnerInfo = await AllServices.getPartnerByField(
          "id",
          userID
        );

        return  partnerInfo.data();
    }

    useEffect(() => {
        fetchuserData().then(data =>  {
            if (data) {
                setUserData(data)
            }
            else {
                setUserData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    partner_code: "",
                    earnings: 0,
                })
            }
        })
    }
    , [ userID])
  return (
    <>
    <Nav />
    

    <p>hello{userData.firstName}</p>
    
    <p>{userData.partner_code}</p></>
  )
}

export default Dashboard