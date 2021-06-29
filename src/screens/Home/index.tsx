import React, { useState, useCallback } from 'react';
import { View, FlatList } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Background } from '../../components/Background';
import { ButtonAdd } from '../../components/ButtonAdd';
import { CategorySelect } from '../../components/CategorySelect';
import { ListHeader } from '../../components/ListHeader';
import { ListDivider } from '../../components/ListDivider';
import { Profile } from '../../components/Profile';
import { Appointment, AppointmentDTO } from '../../components/Appointment';
import { Load } from '../../components/Load';

import { COLLECTION_APPOINTMENT } from '../../configs/database';
import { styles } from './styles';

export function Home() {
  const navigation = useNavigation();
  const [category, setCategory] = useState('');
  const [appointments, setAppointments] = useState<AppointmentDTO[]>([]);
  const [loading, setLoading] = useState(true);

  function handleCategorySelect(categoryId: string) {
    categoryId === category ? setCategory('') : setCategory(categoryId);
  }

  function handleAppointmentDetails(appointment: AppointmentDTO) {
    navigation.navigate('AppointmentDetails', { appointment });
  }

  function handleAppointmentCreate() {
    navigation.navigate('AppointmentCreate');
  }

  async function loadAppointments() {
    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENT);
    const storageAppointments: AppointmentDTO[] = storage
      ? JSON.parse(storage)
      : [];

    if (category) {
      setAppointments(appointments.filter(item => item.category === category));
    } else {
      setAppointments(storageAppointments);
    }
    setLoading(false);
  }

  useFocusEffect(
    useCallback(() => {
      loadAppointments();
    }, [category])
  );

  return (
    <Background>
      <View style={styles.header}>
        <Profile />
        <ButtonAdd onPress={handleAppointmentCreate} />
      </View>

      <CategorySelect
        categorySelected={category}
        setCategory={handleCategorySelect}
      />

      {loading ? (
        <Load />
      ) : (
        <>
          <ListHeader
            title="Partidas agendadas"
            subtitle={`Total ${appointments.length}`}
          />
          <FlatList
            data={appointments}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <Appointment
                data={item}
                onPress={() => handleAppointmentDetails(item)}
              />
            )}
            style={styles.matches}
            contentContainerStyle={{ paddingBottom: 69 }}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <ListDivider />}
          />
        </>
      )}
    </Background>
  );
}
