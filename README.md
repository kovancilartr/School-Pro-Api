# API Dökümantasyonu

Bu dökümantasyon, sisteminizin API rotalarını ve her birinin işlevini açıklamaktadır. Aşağıda rotalar, kullanılan HTTP metodları ve açıklamaları yer almaktadır.

---

## **Course Rotaları**

### **POST**

1. **Kurs Oluşturma**  
   `POST /course/create/:categoryId`  
   Belirtilen kategoriye yeni bir kurs oluşturur.  
   - **Parametreler**:  
     - `categoryId`: Kategori ID'si

2. **Kategori Oluşturma**  
   `POST /course/category/create`  
   Yeni bir kategori oluşturur.

3. **Bölüm Oluşturma**  
   `POST /course/section/create/:courseId`  
   Belirtilen kursa yeni bir bölüm ekler.  
   - **Parametreler**:  
     - `courseId`: Kurs ID'si

4. **Alt Bölüm Oluşturma**  
   `POST /course/chapter/create/:sectionId`  
   Belirtilen bölüme yeni bir alt bölüm ekler.  
   - **Parametreler**:  
     - `sectionId`: Bölüm ID'si

5. **Satın Alma Kaydı Oluşturma**  
   `POST /course/purchase/create/:courseId&:userId`  
   Kullanıcının belirli bir kursu satın aldığını kaydeder.  
   - **Parametreler**:  
     - `courseId`: Kurs ID'si  
     - `userId`: Kullanıcı ID'si

6. **Dosya Ekleri Oluşturma**  
   `POST /course/attachment/create/:courseId`  
   Belirtilen kursa dosya ekler.  
   - **Parametreler**:  
     - `courseId`: Kurs ID'si

---

### **GET**

1. **Tüm Kursları Listele**  
   `GET /course/all`  
   Sistemdeki tüm kursları döndürür.

2. **Tüm Kategorileri Listele**  
   `GET /course/category/all`  
   Sistemdeki tüm kategorileri döndürür.

3. **Tüm Bölümleri Listele**  
   `GET /course/section/all`  
   Sistemdeki tüm bölümleri döndürür.

4. **Tüm Alt Bölümleri Listele**  
   `GET /course/chapter/all`  
   Sistemdeki tüm alt bölümleri döndürür.

5. **Tüm Satın Almaları Listele**  
   `GET /course/purchase/all`  
   Sistemdeki tüm satın alma kayıtlarını döndürür.

6. **Tüm Ekleri Listele**  
   `GET /course/attachment/all`  
   Sistemdeki tüm dosya eklerini döndürür.

---

### **DELETE**

1. **Kurs Silme**  
   `DELETE /course/:courseId`  
   Belirtilen kursu siler.  
   - **Parametreler**:  
     - `courseId`: Kurs ID'si

2. **Bölüm Silme**  
   `DELETE /course/section/:sectionId`  
   Belirtilen bölümü siler.  
   - **Parametreler**:  
     - `sectionId`: Bölüm ID'si

3. **Alt Bölüm Silme**  
   `DELETE /course/chapter/:chapterId`  
   Belirtilen alt bölümü siler.  
   - **Parametreler**:  
     - `chapterId`: Alt Bölüm ID'si

4. **Kategori Silme**  
   `DELETE /course/category/:categoryId`  
   Belirtilen kategoriyi siler.  
   - **Parametreler**:  
     - `categoryId`: Kategori ID'si

5. **Dosya Silme**  
   `DELETE /course/attachment/:attachmentId`  
   Belirtilen dosya ekini siler.  
   - **Parametreler**:  
     - `attachmentId`: Dosya Eki ID'si

6. **Satın Alma Kaydı Silme**  
   `DELETE /course/purchase/:purchaseId`  
   Belirtilen satın alma kaydını siler.  
   - **Parametreler**:  
     - `purchaseId`: Satın Alma ID'si

---

## **User Rotaları**

### **POST**

1. **Kullanıcı Oluşturma**  
   `POST /user/create`  
   Yeni bir kullanıcı oluşturur.

---

### **GET**

1. **Tüm Kullanıcıları Listele**  
   `GET /user/all`  
   Sistemdeki tüm kullanıcıları döndürür.

2. **Tüm Öğrencileri Listele**  
   `GET /user/all/students`  
   Sistemdeki tüm öğrencileri döndürür.

3. **Tüm Öğretmenleri Listele**  
   `GET /user/all/teachers`  
   Sistemdeki tüm öğretmenleri döndürür.

4. **Tüm Yöneticileri Listele**  
   `GET /user/all/admins`  
   Sistemdeki tüm yöneticileri döndürür.

5. **Kullanıcı Bilgisi Getir**  
   `GET /user/:id`  
   Belirtilen kullanıcıyı döndürür.  
   - **Parametreler**:  
     - `id`: Kullanıcı ID'si

---

### **DELETE**

1. **Kullanıcı Silme**  
   `DELETE /user/:id`  
   Belirtilen kullanıcıyı siler.  
   - **Parametreler**:  
     - `id`: Kullanıcı ID'si

---

Bu dökümantasyon ile API'niz üzerindeki rotaları kolayca anlayabilir ve kullanabilirsiniz. Rotaları test etmek için Postman gibi araçları kullanabilirsiniz. 😊
