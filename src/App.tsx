import React, {useState} from 'react';
import MultiCheck, {Option} from './MultiCheck/MultiCheck';

const options: Option[] = [
  {label: 'New (NEW)', value: 'NEW'},
  {label: 'Active (ACT)', value: 'ACT'},
  {label: 'Price Change (PCG)', value: 'PCG'},
  {label: 'Back on Market (BOM)', value: 'BOM'},
  {label: 'Extended (EXT)', value: 'EXT'},
  {label: 'Reactivated (RAC)', value: 'RAC'},
  {label: 'Contingent (CTG)', value: 'CTG'},
  {label: 'Under Agreement', value: 'UA'},
  {label: 'Sold (SLD)', value: 'SLD'},
  {label: 'Temporarily Withdrawn (WDN)', value: 'WDN'},
  {label: 'Expired (EXP)', value: 'EXP'},
  {label: 'Canceled (CAN)', value: 'CAN'},
  {label: 'Coming Soon (CSO)', value: 'CSO'},
];

const defaultValues: string[] = [
  'NEW', 'ACT', 'PCG', 'RAC', 'UA', 'CSO'
];

const App: React.FunctionComponent = (): JSX.Element => {
  const [selectedValues, setSelectedValues] = useState<string[]>(defaultValues);

  function onSelectedOptionsChange(options: Option[]): void {
    setSelectedValues(options.map(it => it.value))
  }

  return <div>
    <div className='status-title-box'>
      <h1>Status</h1>
    </div>
    <MultiCheck label='' options={options}
                onChange={onSelectedOptionsChange}
                values={selectedValues}
                columns={2}/>
    <div>
      <h2>Current selected values:</h2>
      <div>{selectedValues.join(',')}</div>
    </div>
  </div>
}

export default App;
