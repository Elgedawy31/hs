import { useState } from 'react';
import UniTextInput from '../components/UniTextInput';

const Dashboard = () => {
  const [formValues, setFormValues] = useState({
    text: '',
    email: '',
    password: '',
    number: '',
    textarea: '',
    select: ''
  });

  const handleChange = (name) => (value) => {
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const countryOptions = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' },
  ];

  return (
    <div className="p-6 space-y-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-8">Input Examples</h2>
      
      {/* Text Input */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold mb-2">Text Inputs</h3>
        <UniTextInput
          label="Regular Text"
          type="text"
          placeholder="Enter text"
          value={formValues.text}
          onChange={handleChange('text')}
          required
        />

        <UniTextInput
          label="Email"
          type="email"
          placeholder="Enter email"
          value={formValues.email}
          onChange={handleChange('email')}
          error={formValues.email && !formValues.email.includes('@') ? 'Invalid email format' : ''}
        />

        <UniTextInput
          label="Password"
          type="password"
          placeholder="Enter password"
          value={formValues.password}
          onChange={handleChange('password')}
          required
        />

        <UniTextInput
          label="Number"
          type="number"
          placeholder="Enter number"
          value={formValues.number}
          onChange={handleChange('number')}
        />

        <UniTextInput
          label="Disabled Input"
          type="text"
          placeholder="This input is disabled"
          value=""
          onChange={() => {}}
          disabled
        />
      </div>

      {/* Select Input */}
      <div className="space-y-4 mt-8">
        <h3 className="text-lg font-semibold mb-2">Select Input</h3>
        <UniTextInput
          label="Country Select"
          type="select"
          placeholder="Select a country"
          options={countryOptions}
          value={formValues.select}
          onChange={handleChange('select')}
        />

        <UniTextInput
          label="Disabled Select"
          type="select"
          placeholder="This select is disabled"
          options={countryOptions}
          value=""
          onChange={() => {}}
          disabled
        />
      </div>

      {/* Textarea */}
      <div className="space-y-4 mt-8">
        <h3 className="text-lg font-semibold mb-2">Textarea</h3>
        <UniTextInput
          label="Regular Textarea"
          type="textarea"
          placeholder="Enter long text"
          value={formValues.textarea}
          onChange={handleChange('textarea')}
          rows={4}
        />

        <UniTextInput
          label="Disabled Textarea"
          type="textarea"
          placeholder="This textarea is disabled"
          value=""
          onChange={() => {}}
          disabled
          rows={3}
        />
      </div>
    </div>
  );
};

export default Dashboard;
