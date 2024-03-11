import useRoute from '@/Hooks/useRoute';
import { router } from '@inertiajs/core';
import { usePage } from '@inertiajs/react';
import { Tabs } from '@mantine/core';
import React, { useEffect } from 'react';
import route from 'ziggy-js';

interface Props {
  tabs: Tab[];
  currentActive?: string | null;
}

export interface Tab {
  key: string;
  name: string;
  content: React.ReactNode;
}

const RenderTabList = ({ tabs }: Props) => {
  return (
    <Tabs.List>
      {tabs.map(tab => (
        <Tabs.Tab value={tab.key} key={tab.key}>
          {tab.name}
        </Tabs.Tab>
      ))}
    </Tabs.List>
  );
};

const RenderTabContent = ({ tabs, currentActive }: Props) => {
  return (
    <>
      {tabs.map(tab => (
        <Tabs.Panel value={tab.key} className="py-4" key={tab.key}>
          {currentActive === tab.key && tab.content}
        </Tabs.Panel>
      ))}
    </>
  );
};

const DashboardTabs: React.FC<Props> = ({ tabs }) => {
  const [activeTab, setActiveTab] = React.useState<string | null>(null);
  const props: any = usePage().props;

  useEffect(() => {
    if (props.query?.tab) {
      setActiveTab(props.query.tab as string);
    } else {
      setActiveTab(tabs[0].key);
    }
  }, [props]);

  return (
    <Tabs
      variant="outline"
      radius={'md'}
      value={activeTab}
      onChange={(value: any) => {
        router.get(location.href, { tab: value });
      }}
    >
      <Tabs.List>
        <RenderTabList tabs={tabs} />
      </Tabs.List>
      <RenderTabContent tabs={tabs} currentActive={activeTab} />
    </Tabs>
  );
};

export default DashboardTabs;
