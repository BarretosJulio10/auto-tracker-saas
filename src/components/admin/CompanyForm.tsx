
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Building, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(2, { message: "Nome deve ter pelo menos 2 caracteres" }),
  devices: z.coerce.number().min(0, { message: "Número de dispositivos não pode ser negativo" }),
  logo: z.string().optional(),
});

type CompanyFormValues = z.infer<typeof formSchema>;

interface CompanyFormProps {
  onSubmit: (data: CompanyFormValues) => void;
  onCancel: () => void;
}

const CompanyForm = ({ onSubmit, onCancel }: CompanyFormProps) => {
  const { toast } = useToast();
  const form = useForm<CompanyFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      devices: 0,
      logo: "",
    },
  });

  const handleSubmit = (data: CompanyFormValues) => {
    // In a real application, you would submit this data to your backend
    onSubmit(data);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome da Empresa</FormLabel>
              <FormControl>
                <Input placeholder="Digite o nome da empresa" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="devices"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de Dispositivos</FormLabel>
              <FormControl>
                <Input type="number" min="0" placeholder="0" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="logo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Logo</FormLabel>
              <FormControl>
                <div className="flex items-center gap-2">
                  <Input placeholder="Iniciais ou URL da logo" {...field} />
                  <Button type="button" variant="outline" size="icon">
                    <Upload className="h-4 w-4" />
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancelar
          </Button>
          <Button type="submit">
            <Building className="mr-2 h-4 w-4" />
            Salvar Empresa
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default CompanyForm;
