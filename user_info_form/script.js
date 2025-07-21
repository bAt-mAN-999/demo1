document.addEventListener('DOMContentLoaded', () => {
    const infoForm = document.getElementById('infoForm');
    const outputContainer = document.getElementById('output');

    // Helper function to show error message
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = message;
        }
    }

    // Helper function to clear error message
    function clearError(elementId) {
        const errorElement = document.getElementById(elementId);
        if (errorElement) {
            errorElement.textContent = '';
        }
    }

    // Validation functions
    function validateName(name) {
        if (name.trim() === '') {
            showError('nameError', '名称不能为空。');
            return false;
        }
        clearError('nameError');
        return true;
    }

    function validateAge(age) {
        if (isNaN(age) || age < 10 || age > 100) {
            showError('ageError', '年龄必须是10到100之间的数字。');
            return false;
        }
        clearError('ageError');
        return true;
    }

    function validateGender() {
        const genderRadios = document.querySelectorAll('input[name="gender"]');
        let isSelected = false;
        for (const radio of genderRadios) {
            if (radio.checked) {
                isSelected = true;
                break;
            }
        }
        if (!isSelected) {
            showError('genderError', '请选择性别。');
            return false;
        }
        clearError('genderError');
        return true;
    }

    function validatePostcode(postcode) {
        // 使用正则表达式验证是否是6位数字
        const postcodePattern = /^\d{6}$/;
        if (postcode.trim() === '') {
            clearError('postcodeError'); // Allow empty, but if filled, must be 6 digits
            return true;
        }
        if (!postcodePattern.test(postcode)) {
            showError('postcodeError', '邮政编码必须是6位数字。');
            return false;
        }
        clearError('postcodeError');
        return true;
    }

    // Event listeners for real-time validation (optional, but good for user experience)
    document.getElementById('name').addEventListener('input', (e) => validateName(e.target.value));
    document.getElementById('age').addEventListener('input', (e) => validateAge(parseInt(e.target.value)));
    document.querySelectorAll('input[name="gender"]').forEach(radio => {
        radio.addEventListener('change', validateGender);
    });
    document.getElementById('postcode').addEventListener('input', (e) => validatePostcode(e.target.value));


    infoForm.addEventListener('submit', (event) => {
        event.preventDefault(); // 阻止表单默认提交行为

        // 1. 获取所有输入值
        const name = document.getElementById('name').value;
        const age = parseInt(document.getElementById('age').value);
        const gender = document.querySelector('input[name="gender"]:checked')?.value || '';
        const address = document.getElementById('address').value;
        const city = document.getElementById('city').value;
        const postcode = document.getElementById('postcode').value;

        const selectedHobbies = [];
        document.querySelectorAll('input[name="hobby"]:checked').forEach(checkbox => {
            selectedHobbies.push(checkbox.value);
        });

        // 2. 执行所有验证
        let isValid = true;
        isValid = validateName(name) && isValid;
        isValid = validateAge(age) && isValid;
        isValid = validateGender() && isValid;
        isValid = validatePostcode(postcode) && isValid;

        // 3. 如果所有输入都正确，则显示信息
        if (isValid) {
            document.getElementById('outputName').textContent = name;
            document.getElementById('outputAge').textContent = age;
            document.getElementById('outputGender').textContent = gender || '未选择';
            document.getElementById('outputAddress').textContent = address || '未填写';
            document.getElementById('outputCity').textContent = city || '未选择';
            document.getElementById('outputPostcode').textContent = postcode || '未填写';
            document.getElementById('outputHobby').textContent = selectedHobbies.length > 0 ? selectedHobbies.join(', ') : '未选择';

            outputContainer.style.display = 'block'; // 显示输出区域
            infoForm.reset(); // 清空表单
            // 清除所有实时验证的错误消息，以防用户在提交前有错误但后来修复了
            clearError('nameError');
            clearError('ageError');
            clearError('genderError');
            clearError('postcodeError');

            // 滚动到显示结果的区域
            outputContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });

        } else {
            // 如果有错误，确保输出区域隐藏
            outputContainer.style.display = 'none';
        }
    });
});