import { useState } from 'react';

import { FlowOperationType, FlowStatus, Flow } from '@activepieces/shared';

import { Switch } from '../../../components/ui/switch';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '../../../components/ui/tooltip';
import { flowsApi } from '../lib/flows-api';

export default function FlowStatusToggle({ flow }: { flow: Flow }) {
  const [isLoading, setIsLoading] = useState(false);

  const onCheckedChange = async (checked: boolean) => {
    setIsLoading(true);
    try {
      await flowsApi.applyOperation(flow.id, {
        type: FlowOperationType.CHANGE_STATUS,
        request: {
          status: checked ? FlowStatus.ENABLED : FlowStatus.DISABLED,
        },
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="flex items-center justify-center">
          <Switch
            defaultChecked={flow.status === FlowStatus.ENABLED}
            onCheckedChange={onCheckedChange}
            disabled={isLoading}
          />
        </div>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        {flow.status === FlowStatus.ENABLED ? 'Flow is on' : 'Flow is off'}
      </TooltipContent>
    </Tooltip>
  );
}
