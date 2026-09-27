import React, { useContext, useState } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Pressable,
  Image,
  Linking,
  ActivityIndicator,
  StatusBar,
  TextInput,
} from 'react-native';
import { DataContext } from '../context/contextData.tsx';
import LinearGradient from 'react-native-linear-gradient';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useGoogleSignIn } from '../context/auth.ts';
import VipBadge from '../components/elements/VipBadge.tsx';
import { useNavigation } from '@react-navigation/native';
import FreeBadge from '../components/elements/FreeBadge.tsx';
import { useSize } from '../hooks/useSize.ts';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { useColors } from '../hooks/useColors.ts';
import { useVip } from '../hooks/useVip.ts';
import { useUserAccuracy } from '../hooks/useUserAccuracy.ts';
const ShimmerPlaceHolder = createShimmerPlaceholder(LinearGradient);

export default function Home() {
  const { screen, widthScale, heightScale, sizeScale } = useSize();
  const { user } = useGoogleSignIn();
  const { userVip, setUserPlan } = useVip();
  const { userAccuracy } = useUserAccuracy();
  const colors = useColors();

  const {
    userName,
    userImage,
    sound,
    playSound,
    lessonsData,
    examData,
    firebaseLoaded,
    imgBase,
    language,
  } = useContext(DataContext);

  const navigation = useNavigation<any>();

  const questCover = `${imgBase}/cover/qst.png`;
  const examsCover = `${imgBase}/cover/exm.png`;
  // const priorityCover = `${imgBase}/cover/prio.png`;
  const priorityCover = `${imgBase}/priority/L1/0.jpg`;
  const signsCover = `${imgBase}/cover/sgn.png`;

  const [cheked, setCheked] = useState(1);
  const vehiclesList = [
    {
      icon: 'motorcycle',
      label: language === 'english' ? 'Moto' : 'أ',
      src: 'FontAwesome5',
    },
    {
      icon: 'car-side',
      label: language === 'english' ? 'Car' : 'ب',
      src: 'MaterialCommunityIcons',
    },
    {
      icon: 'truck',
      label: language === 'english' ? 'Truck' : '',
      src: 'MaterialCommunityIcons',
    },
    {
      icon: 'bus',
      label: language === 'english' ? 'Foot' : '',
      src: 'FontAwesome5',
    },
  ];

  const vehiclesListPress = (item: any) => {
    switch (item.label) {
      case 'Moto':
        setCheked(0);
        break;
      case 'Car':
        setCheked(1);
        break;
      case 'Truck':
        setCheked(2);
        break;
      case 'Foot':
        setCheked(3);
        break;
      default:
        break;
    }
  };

  const [openModal, setOpenModal] = useState(false);

  return (
    <View
      style={[
        styles.container,
        {
          width: screen?.width,
          flex: 1,
          backgroundColor: colors?.primary,
          justifyContent: 'space-between',
          alignItems: 'center',
        },
      ]}
    >
      <View
        style={[
          {
            zIndex: 9,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 0,
          },
        ]}
      >
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            top: 0,
            backgroundColor: colors.primary,
            opacity: 0.9,
          }}
        />
        <View
          style={[
            {
              paddingHorizontal: sizeScale(20),
              flexDirection: 'row',
              width: '100%',

              height: heightScale(60),
              justifyContent: 'space-between',
              alignItems: 'center',
              elevation: 3,
              overflow: 'hidden',
            },
          ]}
        >
          <View
            style={{
              backgroundColor: 'transparent',
              alignItems: 'center',
              justifyContent: 'flex-start',
              flexDirection: 'row',
              height: heightScale(50),
              columnGap: 10,
              flex: 1,
            }}
          >
            <TouchableOpacity
              style={{
                borderRadius: 5,
                overflow: 'hidden',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.secondary,
                width: widthScale(35),
                height: heightScale(35),
              }}
              onPress={() => {
                if (sound) playSound('settingsButton');
                navigation.navigate('Profile');
              }}
            >
              {userImage ? (
                <Image
                  style={{
                    width: '100%',
                    height: '100%',
                  }}
                  resizeMode="cover"
                  source={{ uri: userImage }}
                />
              ) : (
                <MaterialCommunityIcons
                  name="account"
                  size={35}
                  color={colors.text.primary}
                />
              )}
            </TouchableOpacity>

            <View
              style={{
                flexDirection: 'column',
                backgroundColor: 'transparent',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                flex: 1,
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text
                  style={{
                    fontSize: sizeScale(16),
                    fontWeight: '900',
                    color: colors.text.primary,
                  }}
                >
                  {userName}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  columnGap: 3,
                }}
              >
                {userAccuracy ? (
                  <Text
                    style={[
                      {
                        color: colors.text.primary,
                        fontSize: sizeScale(13),
                        textAlign: 'center',
                      },
                    ]}
                  >
                    {userAccuracy}
                  </Text>
                ) : (
                  <Text
                    style={[
                      {
                        color: colors.text.primary,
                        fontSize: sizeScale(13),
                        textAlign: 'center',
                      },
                    ]}
                  >
                    0
                  </Text>
                )}
                <FontAwesome5
                  name="percentage"
                  size={sizeScale(13)}
                  color={colors.text.secondary}
                />
              </View>
            </View>
          </View>

          {!userVip ? (
            <FreeBadge
              backColor={colors.secondary}
              elevation={3}
              height={heightScale(28)}
              width={widthScale(45)}
            />
          ) : (
            <VipBadge
              width={widthScale(45)}
              height={heightScale(28)}
              title={false}
              iconSize={sizeScale(15)}
              iconColor={'#dba400'}
              radius={sizeScale(5)}
              backColor={colors.secondary}
              titleColor={colors.text.primary}
              elevation={3}
              textSize={sizeScale(12)}
              icon={true}
            />
          )}
        </View>
      </View>
      <ScrollView
        horizontal={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: 'center',
          justifyContent: 'flex-start',
          paddingTop: sizeScale(80),
          rowGap: sizeScale(10),
          flex: 1,
        }}
        style={{
          width: '100%',
        }}
      >
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'column',
            width: '100%',
            flex: 1,
            gap: sizeScale(10),
          }}
        >
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'transparent',
              flexDirection: 'column',
              width: '100%',
              gap: sizeScale(10),
            }}
          >
            <TextInput
              style={{
                width: '90%',
                height: heightScale(50),
                backgroundColor: colors.staticText.light.secondary,
                borderRadius: sizeScale(8),
              }}
              textAlign="center"
              placeholder="Title"
            />
            <TextInput
              style={{
                width: '90%',
                height: heightScale(100),
                backgroundColor: colors.staticText.light.secondary,
                borderRadius: sizeScale(8),
              }}
              aria-label="Description"
              textAlign="center"
              placeholder="Description"
            />
          </View>
          <View
            style={{
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              flexDirection: 'row',
              flexWrap: 'wrap',
              width: '90%',
              flex: 1,
              gap: sizeScale(10),
            }}
          >
            {vehiclesList.map((item: any, index: number) => {
              if (!firebaseLoaded) {
                return (
                  <ShimmerPlaceHolder
                    key={`shimmer-${index}`}
                    style={{
                      backgroundColor: colors.secondary,
                      alignItems: 'center',
                      borderRadius: sizeScale(10),
                      overflow: 'hidden',
                      elevation: 5,
                      with: widthScale(10),
                      height: heightScale(20),
                      columnGap: sizeScale(14),
                    }}
                    shimmerColors={[
                      colors.secondary,
                      '#6161617c',
                      colors.secondary,
                    ]}
                  />
                );
              }
              return (
                <Pressable
                  onPress={() => {
                    vehiclesListPress(item);
                  }}
                  key={`key-${index}`}
                  style={[
                    {
                      backgroundColor: colors.secondary,
                      alignItems: 'center',
                      height: heightScale(50),
                      borderRadius: sizeScale(10),
                      paddingHorizontal: sizeScale(0),
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                      overflow: 'hidden',
                      gap: sizeScale(10),
                    },
                    index === cheked
                      ? {
                          borderWidth: sizeScale(1),
                          borderColor: colors.active,
                        }
                      : {
                          borderWidth: sizeScale(0),
                          borderColor: colors.active,
                        },
                  ]}
                >
                  <View
                    style={[
                      {
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden',
                      },
                    ]}
                  >
                    {item.src === 'MaterialCommunityIcons' ? (
                      <MaterialCommunityIcons
                        name={item.icon}
                        color={colors.text.secondary}
                        size={sizeScale(20)}
                      />
                    ) : item.src === 'FontAwesome5' ? (
                      <FontAwesome5
                        name={item.icon}
                        color={colors.text.secondary}
                        size={sizeScale(16)}
                      />
                    ) : null}
                  </View>
                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text
                      style={{
                        fontFamily:
                          language === 'english' ? 'sans-serif' : 'Cairo-Bold',
                        color: colors.text.secondary,
                        fontSize: sizeScale(18),
                        fontWeight: 'bold',
                        textAlign: 'center',
                      }}
                    >
                      {item.label}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          width: '100%',
          gap: sizeScale(10),
          flex: 1,
        }}
      >
        <Pressable
          android_ripple={{
            borderless: false,
            color: colors.primary,
            foreground: true,
          }}
          onPress={() => {}}
          style={[
            {
              backgroundColor: colors.active,
              alignItems: 'center',
              width: '90%',
              paddingHorizontal: sizeScale(15),
              paddingVertical: sizeScale(15),
              borderRadius: sizeScale(10),
              flexDirection: 'row-reverse',
              justifyContent: 'center',
              overflow: 'hidden',
              columnGap: sizeScale(14),
            },
          ]}
        >
          <View
            style={[
              {
                width: '25%',
                alignItems: 'flex-end',
                justifyContent: 'center',
                overflow: 'hidden',
              },
            ]}
          >
            <MaterialCommunityIcons
              name={'arrow-right'}
              color={colors.staticText.dark.primary}
              size={sizeScale(18)}
            />
          </View>
          <View
            style={{
              flex: 1,
              alignItems: 'flex-start',
              justifyContent: 'center',
            }}
          >
            <Text
              style={{
                fontFamily: language == 'english' ? 'sans-serif' : 'Cairo-Bold',
                color: colors.staticText.dark.primary,
                fontSize: sizeScale(18),
                textAlign: 'right',
                fontWeight: 'bold',
              }}
            >
              Get Delivrey
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    position: 'relative',
  },
});
