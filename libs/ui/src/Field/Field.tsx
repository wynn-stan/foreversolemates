'use client';

import ImageUpload from './ImageUpload/ImageUpload';
import Checkbox from './Checkbox/FormikCheckbox';
import { Search } from './Search/Search';
import { Phone } from './Phone/Phone';
import Select from './Select/Select';
import Input from './Input/Input';
import Group from './Group/Group';
import Date from './Date/Date';
import GPS from './GPS/GPS';
import Password from './Password/Password';
import Number from './Number/Number';

export default Object.assign(
  {},
  {
    Input,
    Group,
    ImageUpload,
    Select,
    Checkbox,
    Date,
    GPS,
    Phone,
    Search,
    Password,
    Number,
  }
);
