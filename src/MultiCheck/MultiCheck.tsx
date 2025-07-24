import './MultiCheck.css';

import React from 'react';

export type Option = {
  label: string,
  value: string
}

/**
 * Notice:
 * 1. There should be a special `Select All` option with checkbox to control all passing options
 * 2. If columns > 1, the options should be placed from top to bottom in each column
 *
 * @param {string} label - the label text of this component
 * @param {Option[]} options - options
 * @param {string[]} values - default checked option values
 * @param {number} columns - default value is 1
 * @param {Function} onChange - when checked options are changed,
 *                             they should be passed to outside
 */
type Props = {
  label?: string,
  options: Option[],
  columns?: number,
  values?: string[]
  onChange?: (options: Option[]) => void,
}

const MultiCheck: React.FunctionComponent<Props> = (props: Props): JSX.Element => {
  // 1. 解构 props，设置默认值
  const { label, options, values = [], onChange, columns = 1 } = props;

  // 2. 判断是否全选（所有选项都被选中）
  const allChecked = options.length > 0 && options.every((opt: Option) => values.includes(opt.value));
  // 3. 判断是否为部分选中（用于 indeterminate 状态）
  const isIndeterminate = values.length > 0 && !allChecked;

  // 4. 处理单个选项变化
  const handleChange = (value: string) => {
    let newValues: string[];
    if (values.includes(value)) {
      // 取消选中
      newValues = values.filter((v: string) => v !== value);
    } else {
      // 选中
      newValues = [...values, value];
    }
    // 通知父组件选中项变化
    if (onChange) {
      const selectedOptions = options.filter((opt: Option) => newValues.includes(opt.value));
      onChange(selectedOptions);
    }
  };

  // 5. 处理“全选”变化
    const handleSelectAll = () => {
    let newValues: string[];
    if (allChecked) {
      // 已全选，点击后全部取消
      newValues = [];
    } else {
      // 未全选，点击后全部选中
      newValues = options.map((opt: Option) => opt.value);
    }
    // 通知父组件选中项变化
    if (onChange) {
      const selectedOptions = options.filter((opt: Option) => newValues.includes(opt.value));
      onChange(selectedOptions);
    }
  };

  // 6. 多列分配（自上而下分配到 columns 列）
  const getColumns = () => {
    const cols: Option[][] = Array.from({ length: columns }, () => []);
    options.forEach((opt, idx) => {
      cols[idx % columns].push(opt);
    });
    return cols;
  };
  const optionColumns = getColumns();

  // 7. 渲染结构
  return <div className='MultiCheck'>
    {/* 可选的 label 标题 */}
    {label && <div className='MultiCheck-label'>{label}</div>}
    <div className='MultiCheck-options' style={{ display: 'flex', gap: 16 }}>
      {/* “Select All” 全选选项 */}
      <div style={{ flex: '0 0 auto', marginRight: 8 }}>
        <label className="MultiCheck-option-item" style={{ fontWeight: 'bold' }}>
          <input
            type="checkbox"
            checked={allChecked}
            ref={el => { if (el) el.indeterminate = isIndeterminate; }} // 部分选中时设置 indeterminate
            onChange={handleSelectAll}
          />
          <span>Select All</span>
        </label>
      </div>
      {/* 多列渲染选项 */}
      {optionColumns.map((col, colIdx) => (
        <div key={colIdx} style={{ flex: 1 }}>
          {col.map((option: Option) => (
            <label key={option.value} className="MultiCheck-option-item">
              <input
                type="checkbox"
                checked={values.includes(option.value)}
                onChange={() => handleChange(option.value)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </div>
      ))}
    </div>
  </div>;
}

export default MultiCheck;
