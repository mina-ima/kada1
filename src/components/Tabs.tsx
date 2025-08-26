import React, { useState, Children, isValidElement, useRef, useEffect } from 'react';

type TabProps = {
  label: string;
  children?: React.ReactNode;
  backgroundColor?: string;
};

export const Tab: React.FC<TabProps> = ({ children }) => <>{children}</>;

type TabsProps = {
  children: React.ReactNode;
};

export const Tabs: React.FC<TabsProps> = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const tabs = Children.toArray(children).filter(isValidElement) as React.ReactElement<TabProps>[];

  useEffect(() => {
    tabRefs.current[activeIndex]?.focus();
  }, [activeIndex]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let newIndex = index;
    if (e.key === 'ArrowRight') {
      newIndex = (index + 1) % tabs.length;
    } else if (e.key === 'ArrowLeft') {
      newIndex = (index - 1 + tabs.length) % tabs.length;
    } else if (e.key === 'Home') {
      newIndex = 0;
    } else if (e.key === 'End') {
      newIndex = tabs.length - 1;
    }

    if (newIndex !== index) {
      e.preventDefault();
      setActiveIndex(newIndex);
    }
  };

  return (
    <div>
      <div role="tablist" className="flex border-b border-gray-200 overflow-x-auto whitespace-nowrap px-4">
        {tabs.map((tab, index) => {
          const { label } = tab.props;
          const isActive = index === activeIndex;
          return (
            <button
              key={index}
              ref={(el) => { tabRefs.current[index] = el; }}
              role="tab"
              id={`tab-${index}`}
              aria-controls={`tabpanel-${index}`}
              aria-selected={isActive}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              tabIndex={isActive ? 0 : -1}
              className={`py-2 px-4 text-sm font-medium ${
                isActive
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
      <div>
        {tabs.map((tab, index) => {
          const isActive = index === activeIndex;
          const { backgroundColor } = tab.props;
          return (
            <div
              key={index}
              id={`tabpanel-${index}`}
              role="tabpanel"
              aria-labelledby={`tab-${index}`}
              hidden={!isActive}
              className={`p-4 ${backgroundColor || ''}`}
            >
              {isActive && tab.props.children}
            </div>
          );
        })}
      </div>
    </div>
  );
};