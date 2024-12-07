import React, { useState } from 'react';
import { View, StyleSheet, Button, Image, Text } from 'react-native';
import Video from 'react-native-video';
import axios from 'axios';

const StudenDetail = () => {
  // State để lưu URL của ảnh chụp
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Fake API endpoints
  const streamUrl = 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'; // Video giả lập
  const captureApi = 'https://6754347636bcd1eec8508401.mockapi.io/ESP32_CAM'; // Fake API

  // Hàm chụp ảnh
  const captureImage = async () => {
    try {
      setStatusMessage('Đang chụp ảnh...');
      const response = await axios.get(captureApi); // Gửi request đến API
      setImageUrl(response.data.imageUrl); // Cập nhật URL ảnhd // Thông báo trạng thái
    } catch (error) {
      console.error('Lỗi chụp ảnh:', error);
      setStatusMessage('Lỗi chụp ảnh!');
    }
  };

  return (
    <View style={styles.container}>
      {/* Video stream */}
      <Text style={styles.header}>ESP32-CAM Stream</Text>
      <Video
        source={{ uri: streamUrl }}
        style={styles.video}
        resizeMode="contain"
        controls
      />

      {/* Button chụp ảnh */}
      <Button title="Chụp Ảnh" onPress={captureImage} />

      {/* Hiển thị trạng thái */}
      {statusMessage && <Text style={styles.status}>{statusMessage}</Text>}

      {/* Hiển thị ảnh chụp */}
      {imageUrl && (
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="contain"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  video: {
    width: '100%',
    height: 200,
    backgroundColor: '#000',
    marginBottom: 16,
  },
  status: {
    marginTop: 8,
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
  },
  image: {
    width: '100%',
    height: 200,
    marginTop: 16,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
});

export default StudenDetail;
