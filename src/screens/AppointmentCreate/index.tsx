import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/core';

import { GuildDTO } from '../../components/Guild';
import { ModalView } from '../../components/ModalView';
import { CategorySelect } from '../../components/CategorySelect';
import { Header } from '../../components/Header';
import { Button } from '../../components/Button';
import { GuildIcon } from '../../components/GuildIcon';
import { SmallInput } from '../../components/SmallInput';
import { TextArea } from '../../components/TextArea';
import { Background } from '../../components/Background';

import { Guilds } from '../Guilds';

import { theme } from '../../global/styles/theme';
import { COLLECTION_APPOINTMENT } from '../../configs/database';
import { styles } from './styles';

export function AppointmentCreate() {
  const navigation = useNavigation();
  const [category, setCategory] = useState('');
  const [openGuildsModal, setOpenGuildsModal] = useState(false);
  const [guild, setGuild] = useState<GuildDTO>({} as GuildDTO);

  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [description, setDescription] = useState('');

  function handleCategorySelect(categoryId: string) {
    setCategory(categoryId);
  }

  function handleToggleModal() {
    setOpenGuildsModal(!openGuildsModal);
  }

  function handleGuildSelect(guildSelect: GuildDTO) {
    setGuild(guildSelect);
    setOpenGuildsModal(false);
  }

  async function handleSave() {
    const newAppointment = {
      id: uuid.v4(),
      guild,
      category,
      date: `${day}/${month} às ${hour}:${minute}h`,
      description,
    };
    const storage = await AsyncStorage.getItem(COLLECTION_APPOINTMENT);
    const appointments = storage ? JSON.parse(storage) : [];

    await AsyncStorage.setItem(
      COLLECTION_APPOINTMENT,
      JSON.stringify([...appointments, newAppointment])
    );
    navigation.navigate('Home');
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Background>
        <ScrollView>
          <Header title="Agendar partida" />

          <Text
            style={[
              styles.label,
              { marginLeft: 24, marginTop: 36, marginBottom: 18 },
            ]}
          >
            Categoria
          </Text>

          <CategorySelect
            categorySelected={category}
            setCategory={handleCategorySelect}
            hasCheckBox
          />

          <View style={styles.form}>
            <RectButton onPress={handleToggleModal}>
              <View style={styles.select}>
                {guild.icon ? (
                  <GuildIcon guildId={guild.id} iconId={guild.icon} />
                ) : (
                  <View style={styles.image} />
                )}

                <View style={styles.selectBody}>
                  <Text style={styles.label}>
                    {guild.name ? guild.name : 'Selecione um servidor'}
                  </Text>
                </View>

                <Feather
                  name="chevron-right"
                  color={theme.colors.heading}
                  size={18}
                />
              </View>
            </RectButton>

            <View style={styles.field}>
              <View>
                <Text style={[styles.label, { marginBottom: 12 }]}>
                  Dia e mês
                </Text>
                <View style={styles.column}>
                  <SmallInput maxLength={2} value={day} onChangeText={setDay} />
                  <Text style={styles.divider}>/</Text>
                  <SmallInput
                    maxLength={2}
                    value={month}
                    onChangeText={setMonth}
                  />
                </View>
              </View>

              <View>
                <Text style={[styles.label, { marginBottom: 12 }]}>
                  Hora e minuto
                </Text>
                <View style={styles.column}>
                  <SmallInput
                    maxLength={2}
                    value={hour}
                    onChangeText={setHour}
                  />
                  <Text style={styles.divider}>:</Text>
                  <SmallInput
                    maxLength={2}
                    value={minute}
                    onChangeText={setMinute}
                  />
                </View>
              </View>
            </View>

            <View style={[styles.field, { marginBottom: 12 }]}>
              <Text style={styles.label}>Descrição</Text>
              <Text style={styles.caracteresLimit}>Máx 100 caracteres</Text>
            </View>
            <TextArea
              multiline
              maxLength={100}
              numberOfLines={5}
              autoCorrect={false}
              value={description}
              onChangeText={setDescription}
            />
            <View style={styles.footer}>
              <Button title="Agendar" onPress={handleSave} />
            </View>
          </View>
        </ScrollView>
      </Background>

      <ModalView visible={openGuildsModal} closeModal={handleToggleModal}>
        <Guilds onSelectGuild={handleGuildSelect} />
      </ModalView>
    </KeyboardAvoidingView>
  );
}
