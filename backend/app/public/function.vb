Function CallDeepSeekAPI(api_key As String, inputText As String) As String
    Dim response As String
    Dim SendText As String
    Dim API As String
    Dim Http As Object
    Dim stauts_code As Integer
    
    API = "https://api.deepseek.com/chat/completions"
    
    SendText = "{""model"":""deepseek-reasoner"",""messages"":[{""role"":""system"",""content"":""You are a Word assistant""},{""role"":""user"",""content"":""" & inputText & """}],""stream"":false}"
    
    Set Http = CreateObject("MSXML2.XMLHTTP")
    
    With Http
      .Open "POST", API, False
      .setRequestHeader "Content-Type", "application/json"
      .setRequestHeader "Authorization", "Bearer " & api_key
      .send SendText
      stauts_code = .Status
      response = .responseText
    End With
    
    MsgBox "API response: " & response,vbInformation,"Debug Info"

    If stauts_code = 200 Then
       CallDeepSeekAPI = response
    Else
       CallDeepSeekAPI = "Error: " & status_code & " - " & response
    End If
    
    Set Http = Nothing
    
End Function