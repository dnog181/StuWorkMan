Sub DeepV3()
  Dim api_key As String
  Dim inputText As String
  Dim response As String
  Dim regex As Object
  Dim reasoningRegex As Object
  Dim contentRegex As Object
  Dim matches As Object
  Dim reasoningMatches As Object
  Dim originalSelection As Object
  Dim resoningContent As String
  Dim finalContent As String
  
  api_key = "sk-e7e2e30d72fd4aa1b63c5dd2eb806a5d"
  If api_key = "" Then
     MsgBox "enter API Key"
     Exit Sub
  ElseIf Selection.Type <> wdSelectionNormal Then
     MsgBox "please select text"
     Exit Sub
  End If
  
  Set originalSelection = Selection.Range.Duplicate
  inputText = Replace(Replace(Replace(Replace(Replace(Selection.Text, "\", "\\"), vbCrLf, ""), vbCr, ""), vbLf, ""), Chr(34), "\""")
  response = CallDeepSeekAPI(api_key, inputText)
  If Left(response, 5) <> "Error" Then

     Set reasoningRegex = CreateObject("VBScript.RegExp")
     With reasoningRegex
          .Global = True
          .MultiLine = True
          .IgnoreCase = False
          .Pattern = """reasoning_content"":""(.*?)"""
     End With
     
     Set contentRegex = CreateObject("VBScript.RegExp")
     With contentRegex
          .Global = True
          .MultiLine = True
          .IgnoreCase = False
          .Pattern = """content"":""(.*?)"""
     End With
     
     Set reasoningMatches = reasoningRegex.Execute(response)
     If reasoningMatches.Count > 0 Then
         reasoningContent = reasoningMatches(0).SubMatches(0)
         reasoningContent = Replace(reasoningContent, "\n\n", vbNewLine)
         reasoningContent = Replace(reasoningContent, "\n", vbNewLine)
         reasoningContent = Replace(Replace(reasoningContent, """", Chr(34)), """", Chr(34))
     End If
     
     Set matches = contentRegex.Execute(response)
     If matches.Count > 0 Then
        finalContent = matches(0).SubMatches(0)
        finalContent = Replace(finalContent, "\n\n", vbNewLine)
        finalContent = Replace(finalContent, "\n", vbNewLine)
        finalContent = Replace(Replace(finalContent, """", Chr(34)), """", Chr(34))
        
        Selection.Collapse Direction:=wdCollapseEnd
        
        If Len(reasoningContent) > 0 Then
          Selection.TypeParagraph
          Selection.TypeText "推理过程:"
          Selection.TypeParagraph
          Selection.TypeText reasoningContent
          Selection.TypeParagraph
          Selection.TypeText "最终回答:"
          Selection.TypeParagraph
        End If
        
        Selection.TypeText finalContent
        
        originalSelection.Select
		
     Else
        MsgBox "解析响应失败", vbExclamation
     End If
  Else
     MsgBox response,vbCritical
  End If
End Sub