document.addEventListener('DOMContentLoaded', () => {
    const wheel = document.getElementById('wheel');
    const spinBtn = document.getElementById('spinBtn');
    const resultBox = document.getElementById('result');

    // 1. الخيارات التي تريدها في دولاب الحظ
    const prizes = [
        "خصم 25%", 
        "حسناً، دوّر مرة أخرى", 
        "جائزة بسيطة", 
        "حظ أوفر المرة القادمة", 
        "شحن مجاني",
        "جائزة كبرى!"
    ];
    
    // يمكننا استخدام Canvas لرسم الأجزاء هنا، لكن لتبسيط التجربة سنعتمد على التدوير فقط حالياً.
    
    let isSpinning = false;
    
    spinBtn.addEventListener('click', () => {
        if (isSpinning) return;
        
        isSpinning = true;
        resultBox.textContent = 'الدولاب يدور...';
        
        // 2. تحديد النتيجة عشوائياً (اختيار رقم من 0 حتى عدد الخيارات - 1)
        const winningIndex = Math.floor(Math.random() * prizes.length);
        const winningPrize = prizes[winningIndex];
        
        // 3. محاكاة الدوران
        // لفة كاملة (360 درجة) × 10 مرات + زاوية عشوائية للمحاكاة
        const randomRotation = Math.floor(Math.random() * 360); 
        const totalRotation = (360 * 10) + randomRotation;
        
        // تطبيق التدوير (في بيئة العمل الحقيقية، نحتاج لزاوية دقيقة)
        wheel.style.transform = `rotate(${totalRotation}deg)`;

        // 4. عرض النتيجة بعد انتهاء وقت التحريك (5 ثواني كما في CSS)
        setTimeout(() => {
            isSpinning = false;
            resultBox.innerHTML = `**ألف مبروك!** لقد فزت بـ: <span>${winningPrize}</span>`;
            
            // إضافة زر المشاركة على واتساب
            const whatsappMsg = `لقد فزت في دولاب الحظ بـ: ${winningPrize}!`;
            const whatsappLink = `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappMsg)}`;
            
            resultBox.innerHTML += `<br><a href="${whatsappLink}" target="_blank" style="display:inline-block; margin-top:10px; padding:8px 15px; background-color: #25D366; color: white; text-decoration: none; border-radius: 5px;">شارك فوزك على واتساب</a>`;
            
        }, 5000); // 5000ms = 5 ثواني (مطابقة لوقت الانتقال في CSS)
    });
});
