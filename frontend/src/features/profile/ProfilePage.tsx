import {FC, useEffect, useState} from 'react';
import {Image, Loader, Text} from '@mantine/core';
import {getUserProfile} from './api/get-me';

interface UserProfile {
    id: number;
    email: string;
}

export const ProfilePage: FC = () => {
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const data = await getUserProfile();
                setUserProfile(data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchUserProfile();
    }, []);

    if (loading) {
        return <Loader size="xl" />;
    }

    return (
        <div style={{ width: '100%', display: 'flex', justifyContent: 'center', minWidth: "255px" }}>
            <div style={{
                background: "lightgray",
                width: "100%",
                maxWidth: "500px",
                height: "600px",
                marginLeft: "auto",
                marginRight: "auto",
                borderRadius: "5%"
            }}>
                <div style={{ display: 'flex', justifyContent: 'center', paddingTop: "60px" }}>
                    <Image radius="md" src="src/assets/avatar2.png" h="150" w="auto" />
                </div>
                <div style={{ paddingTop: "60px", paddingLeft: "50px" }}>
                    <Text size="20px" fw="bold">
                        Email:
                    </Text>
                    <Text size="18px" c="black" pt="30px">
                        <div style={{backgroundColor: "white", height: "60px", width: "400px", alignContent: "center"}}>
                            <div style={{paddingLeft: "10px", fontWeight: "400"}}>
                                {userProfile?.email}
                            </div>
                        </div>
                    </Text>
                </div>
                <div style={{paddingTop: "60px", paddingLeft: "50px"}}>
                <Text size="20px" fw="bold">
                        ID:
                    </Text>
                    <Text size="18px" c="black" pt="30px">
                        <div style={{backgroundColor: "white", height: "60px", width: "400px", alignContent: "center"}}>
                            <div style={{paddingLeft: "10px", fontWeight: "400"}}>
                                {userProfile?.id}
                            </div>
                        </div>
                    </Text>
                </div>
            </div>
        </div>
    );
};
