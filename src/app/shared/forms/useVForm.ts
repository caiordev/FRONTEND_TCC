import { FormHandles } from "@unform/core";
import { useCallback, useRef } from "react";

export const useVForm = () => {
  const formRef = useRef<FormHandles>(null);
  const formRefAnuidade = useRef<FormHandles>(null);
  const isSavingAndNew = useRef(false);
  const isSavingAndClose = useRef(false);

  const handleSave = useCallback(() => {
    isSavingAndNew.current = false;
    isSavingAndClose.current = false;
    formRef.current?.submitForm();
  }, []);

  const handleSaveAnuidade = useCallback(() => {
    isSavingAndNew.current = false;
    isSavingAndClose.current = false;
    formRefAnuidade.current?.submitForm();
  }, []);
  const handleSaveAndNew = useCallback(() => {
    isSavingAndNew.current = true;
    isSavingAndClose.current = false;
  }, []);
  const handleSaveAndClose = useCallback(() => {
    isSavingAndNew.current = false;
    isSavingAndClose.current = true;
  }, []);
  const handleIsSaveAndNew = useCallback(() => {
    return isSavingAndNew.current;
  }, []);
  const handleIsSaveAndClose = useCallback(() => {
    return isSavingAndClose.current;
  }, []);

  return {
    formRef,
    formRefAnuidade,
    save: handleSave,
    saveAnuidade: handleSaveAnuidade,
    saveAndNew: handleSaveAndNew,
    saveAndClose: handleSaveAndClose,
    isSaveAndNew: handleIsSaveAndNew,
    isSaveAndClose: handleIsSaveAndClose,
  };
};
