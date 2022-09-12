export const required = value => value ? undefined : 'Value is required';

export const maxLength = max => value =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined;

export const maxLength15 = maxLength(15);

export const number = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined;
export const positiveNumber = (value) => {
    const isNotNumber = number(value);

    let result = isNotNumber;
    if(!isNotNumber){
        result = value < 0
            ? 'Must be positive number'
            : undefined;
    }
    return result;
};

export const numberInRange = (min, max) => value => {
    const isNotNumber = number(value);

    let result = isNotNumber;
    if(!isNotNumber){
        if (value < min) {
            result = `Must be greater or equal ${min}`;
        }else if(value > max){
            result = `Must be less or equal ${max}`;
        }else{
            result = undefined;
        }
    }
    return result;
};
export const isNumberPercent = numberInRange(0, 100);

export const minValue = min => value =>
    value && value.length < min ? `Must be at least ${min}` : undefined;

export const maxValue = max => value =>
    value && value.length > max ? `Must be no more ${max}` : undefined;

export const positiveValue = value =>
    value && value.length < 0 ? 'Must be positive integer' : undefined;

export const percentValue = value =>
    value && (value > 100) ? 'Must be in range 0-100' : undefined;
export const minValue10 = minValue(10);
export const minValue8 = minValue(8);
export const minValue3 = minValue(3);
export const minValue2 = minValue(2);
export const minValue1 = minValue(1);

export const maxValue300 = maxValue(300);
export const maxValue180 = maxValue(180);
export const maxValue100 = maxValue(100);
export const maxValue50 = maxValue(50);
export const maxValue20 = maxValue(20);
export const maxValue8 = maxValue(8);

// export const phoneNumber = value =>
//     value && !/^(0|[1-9][0-9]{9})$/i.test(value)
//         ? 'Invalid phone number, must be 10 digits': undefined;

export const phoneNumber = value =>
    value && !/^[\d ()+-]+$/i.test(value)
        ? 'Invalid phone number, must be digits, () or +': undefined;

        
export const email = value => !value ? 'Value is required' : 
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ?
        'Invalid email address' : undefined;

const nameRegEx = /^[A-Z][a-z]+$/;
const startsWithCapital = (word) => /[A-Z]/.test(word.charAt(0));

export const isName = (value) => {
    const isFirstCapital = startsWithCapital(value);

    if (!isFirstCapital) {
        return 'Must start from capital letter!';
    }else{
        const isName = nameRegEx.test(value);

        return !isName
            ? 'Сan only be continued in lowercase letters!'
            : undefined;
    }
};

export const simpleNameValidation = value => !/^[A-Z]+$/i.test(value)
    ? 'Must contains only letters!'
    : undefined;


export const tooOld = value =>
    value && value > 65 ? 'You might be too old for this' : undefined;

export const aol = value =>
    value && /.+@aol\.com/.test(value) ?
        'Really? You still use AOL for your email?' : undefined;

export const passwordL1 = value => !value ? 'Value is required' : 
    value && !/^(.){8,30}$/.test(value) ?
        'Minimum 8 characters' : undefined;
export const passwordLChild = value =>
    value && !/^(.){5,30}$/.test(value) ?
        'Minimum 5 characters' : undefined;

export const passwordL2 = value => 
    value && !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/i.test(value) ?
        'Minimum 8 characters, at least 1 letter, 1 number and 1 special character' : undefined;

export const passwordL3 = value =>
    value && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/i.test(value) ?
        'Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter and 1 number' : undefined;

export const passwordL4 = value =>
    value && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/i.test(value) ?
        'Minimum 8 characters, at least 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character' : undefined;

// export const isValidUrlRegex = value =>{
//     const regex = new RegExp('/(((http|ftp|https):\/{2})+(([0-9a-z_-]+\.)+(aero|asia|biz|cat|com|coop|edu|gov|info|int|jobs|mil|mobi|museum|name|net|org|pro|tel|travel|ac|ad|ae|af|ag|ai|al|am|an|ao|aq|ar|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|co|cr|cu|cv|cx|cy|cz|cz|de|dj|dk|dm|do|dz|ec|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|in|io|iq|ir|is|it|je|jm|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mk|ml|mn|mn|mo|mp|mr|ms|mt|mu|mv|mw|mx|my|mz|na|nc|ne|nf|ng|ni|nl|no|np|nr|nu|nz|nom|pa|pe|pf|pg|ph|pk|pl|pm|pn|pr|ps|pt|pw|py|qa|re|ra|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sj|sk|sl|sm|sn|so|sr|st|su|sv|sy|sz|tc|td|tf|tg|th|tj|tk|tl|tm|tn|to|tp|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|ye|yt|yu|za|zm|zw|arpa)(:[0-9]+)?((\/([~0-9a-zA-Z\#\+\%@\.\/_-]+))?(\?[0-9a-zA-Z\+\%@\/&\[\];=_-]+)?)?))\b/imu');
//     return regex.test(value) ? undefined : "Url is not valid";
// }

export const isValidStartUrl = value => {
    if(value) {
        return value?.startsWith('/') ||value?.startsWith('http://') ||value?.startsWith('https://') || value?.startsWith('www.') ? undefined : 'Url is not valid';
    } else {
        return undefined;
    }
};

export const checkNewPasswords = (value, allValues) => {
    return value !== allValues.newPassword ? 'Passwords do not match' : undefined;
};


export const isSlug = value => value && !/^[a-zA-Z0-9_\-]{1,}$/i.test(value) ? 'Incorrect URL address' : undefined;

export const lessThenTotal = (value, allValues) => {
    return value > allValues.total ? 'Can\'t be greater than total' : undefined;
};