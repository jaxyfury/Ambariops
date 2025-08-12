import type { Meta, StoryObj } from '@storybook/react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../components/ui/dialog';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Stepper, StepperItem, StepperTrigger, StepperIndicator, StepperNumber, StepperLabel, StepperSeparator, StepperContent, useStepper } from '../components/ui/stepper';


const meta: Meta<typeof Dialog> = {
  title: 'UI/Dialog',
  component: Dialog,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Dialog>;

export const Default: Story = {
  render: (args) => (
    <Dialog {...args}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input id="username" defaultValue="@peduarte" className="col-span-3" />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

const StepperDialog = () => {
  const { nextStep, prevStep, setStep, activeStep } = useStepper({ initialStep: 0 });

  return (
    <Dialog defaultOpen>
        <DialogContent className="sm:max-w-2xl">
            <DialogHeader>
            <DialogTitle>Add New Cluster</DialogTitle>
            <DialogDescription>
                Follow the steps to register a new Ambari cluster.
            </DialogDescription>
            </DialogHeader>
            <Stepper activeStep={activeStep} className="mt-4">
            <div className="flex w-full">
                <StepperItem step={0}>
                <StepperTrigger>
                    <StepperIndicator>
                    <StepperNumber />
                    </StepperIndicator>
                    <StepperLabel>Cluster Details</StepperLabel>
                </StepperTrigger>
                <StepperSeparator />
                </StepperItem>
                <StepperItem step={1}>
                <StepperTrigger>
                    <StepperIndicator>
                    <StepperNumber />
                    </StepperIndicator>
                    <StepperLabel>Credentials</StepperLabel>
                </StepperTrigger>
                <StepperSeparator />
                </StepperItem>
                <StepperItem step={2}>
                <StepperTrigger>
                    <StepperIndicator>
                    <StepperNumber />
                    </StepperIndicator>
                    <StepperLabel>Confirmation</StepperLabel>
                </StepperTrigger>
                </StepperItem>
            </div>
            
            <StepperContent step={0} className="mt-6">
                <div className="grid gap-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Name</Label>
                        <Input id="name" placeholder="e.g., Production-West-2" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="url" className="text-right">Ambari URL</Label>
                        <Input id="url" placeholder="http://c1.ambari.apache.org:8080" className="col-span-3" />
                    </div>
                </div>
            </StepperContent>

            <StepperContent step={1} className="mt-6">
                <div className="grid gap-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="username" className="text-right">Username</Label>
                        <Input id="username" defaultValue="admin" className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password"  className="text-right">Password</Label>
                        <Input id="password" type="password" className="col-span-3" />
                    </div>
                </div>
            </StepperContent>
            
            <StepperContent step={2} className="mt-6 text-center">
                <div className="p-8 bg-muted rounded-lg">
                    <h3 className="text-lg font-semibold">Ready to Add Cluster</h3>
                    <p className="text-muted-foreground mt-2">The cluster 'Production-West-2' will be registered. This will initiate discovery of services and hosts.</p>
                </div>
            </StepperContent>
            
            <DialogFooter className="mt-6 pt-4 border-t">
                {activeStep > 0 && <Button variant="outline" onClick={prevStep}>Back</Button>}
                {activeStep < 2 && <Button onClick={nextStep}>Next</Button>}
                {activeStep === 2 && <Button>Finish Registration</Button>}
            </DialogFooter>
            </Stepper>
        </DialogContent>
    </Dialog>
  );
}


export const WithStepper: Story = {
    render: () => <StepperDialog />,
};
