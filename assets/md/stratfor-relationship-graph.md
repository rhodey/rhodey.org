!!!
stratfor-relationship-graph
June 28, 2012
Stratfor Relationship Graph
WikiLeaks began publishing [The Global Intelligence Files](http://wikileaks.org/the-gifiles.html) in 2012, over five million e-mails from the Texas headquartered "global intelligence" company Stratfor. Sometime during that summer long, long before [d3.js](https://d3js.org/) I spent a few hours paging through these emails. Wikileak's website allows you to browse by date of release or date of the document itself but this method of examination soon lost my interest, what I really wanted was a holistic understanding of the emails without having to think all that much.
<!--no banner-->
!!!


On Monday February 27th, 2012 WikiLeaks began publishing [The Global Intelligence Files](http://wikileaks.org/the-gifiles.html), over five million e-mails from the Texas headquartered "global intelligence" company Stratfor. The e-mails date between July 2004 and late December 2011 and reveal the inner workings of a company that provides confidential intelligence services to large corporations such as Dow Chemical Co, Lockheed Martin, Northrop Grumman, Raytheon and government agencies including the US Department of Homeland Security and the US Marines.

Sometime during that summer **long, long before [d3.js](https://d3js.org/)** I spent a few hours paging through these emails. Wikileak's website allows you to browse by date of release or date of the document itself but this method of examination soon lost my interest, what I really wanted was a holistic understanding of the emails without having to think all that much. Pictures can be nice and simple like that, relationship graphs even better.

I downloaded a copy of the dump to my laptop and found the raw emails sitting in a CSV file (`metadata.csv`). The ordering of the values is kindly specified at the top of the file but a few abnormalities in the formatting made it impossible to read using any software libraries I could find. At the time I was working on a machine vision project in [Ada](http://en.wikipedia.org/wiki/Ada_%28programming_language%29), there was really no other reason for my language choice. I defined a new data type for modeling the relationship between the sender and receiver of an email and then parsed these from the CSV.

```Ada
type Email_Type is array (1 .. Email_Character_Limit) of Character;
type Strength_Type is (Direct, Attachment);
type Relationship_Type is
  record
    Sender   : Email_Type;
    Receiver : Email_Type;
    Strength : Strength_Type;
  end record;
```

In the domain of Computer Science this relationship graph is actually a "Directed Cyclic Graph", If you're not familiar with [Graph Theory](http://en.wikipedia.org/wiki/Graph_theory) now would be a great time to learn. AT&T Research has this awesome open source graph visualization software called [Graphviz](http://www.graphviz.org/), you feed it these simple *"DOT language"* files and it outputs an image of the directed graph you described. The next step was to output the relationships parsed from the CSV into a DOT language file which looks something like this:

```
"burton@ stratfor.com" -> "duchin@stratfor.com"
```

The DOT language file will contain duplicate lines in the case that `PersonA` has sent more than one email to `PersonB`. Piping the output of the linux **sort** utility to **uniq -u** took care of all duplicate lines.

```
$ sort {filename} | uniq -u > {filename}
```

As a result of the alphabetical sort the DOT file's syntax became slightly corrupted. Nothing too terrible, basically the opening left brace and closing right brace need be put back in place. After that last edit the DOT file was now ready for GraphViz. GraphViz has 11 different layout engines and each will produce a different representation of the directed graph. Some are better than others depending on what kind of graph you're working with, my personal favorite for this data set is *"fdp"*.

> FDP layouts are spring model layouts similar to those of neato, but does this by reducing forces rather than working with energy.

```
$ dot -Kfdp -Tpng {DOT-filename} > {PNG-filename}
```

![the result](/assets/img/other/stratfor-graph.jpg)

When I make the time I plan to color the edges of the graph based off of relationship strength judged by email count, attachments, and a few other things. The Ada code I whipped up for this is pretty bare-bones with no attempt to break anything out to separate packages, however it is thoroughly commented in case anyone had some new ideas of their own.


```ada
with Ada.Text_IO;            use Ada.Text_IO;
with Ada.Command_Line;       use Ada.Command_Line;
with Ada.Characters.Latin_1; use Ada.Characters.Latin_1;

procedure Email_Relationship_Analysis is
  -- Constants.
  Email_Character_Limit   : constant := 50;
  Relationship_Array_Size : constant := 2000;

  -- Special types.
  type Email_Type is array (1 .. Email_Character_Limit) of Character;
  type Strength_Type is (Direct, Attachment);
  type Relationship_Type is
      record
        Sender   : Email_Type;
        Receiver : Email_Type;
        Strength : Strength_Type;
      end record;
  type Relationship_Array_Type is array (Positive range <>) of Relationship_Type;

  -- CSV Parsing Variables.
  CSV_File    : Ada.Text_IO.File_Type;
  Value_Count : Positive := 1;
  In_String   : Boolean := False;
  Char        : Character;
  Last_Char   : Character := '0';

  -- Email extraction variables.
  Email_Count         : Natural  := 0;
  Email_Address_Index : Positive := 1;
  Email_Address_Count : Natural  := 0;

  -- Relationship variables.
  Sender_Address     : Email_Type := (others => ' ');
  Relationships      : Relationship_Array_Type(1 .. Relationship_Array_Size) := (others => ((others => ' '), (others => ' '), Direct));
  Relationship_Count : Natural := 0;

  -- Dot variabls.
  DOT_File : Ada.Text_IO.File_Type;

begin
  -- Display usage statement.
  if Ada.Command_Line.Argument_Count < 2 then
    Ada.Text_IO.Put_Line("Usage: " & Ada.Command_Line.Command_Name & " <csv-input-file> <dot-output-file>");
  end if;

  -- Open the CSV file.
  Ada.Text_IO.Open (File => CSV_File,
                    Mode => Ada.Text_IO.In_File,
                    Name => Ada.Command_Line.Argument(1));

  -- Loop through till the end of the file.
  while not Ada.Text_IO.End_Of_File (CSV_File) loop
    -- Grab character.
    Ada.Text_IO.Get(CSV_File, Char);

    -- Start or end of string constant.
    if Char = '"' and Last_Char /= '\\' then
      if In_String = True then
        In_String := False;
      else
        In_String := True;
      end if;

    -- End of value.
    elsif ((Char = ',') or (Char = Ada.Characters.Latin_1.CR and Value_Count = 11)) and In_String = False then
      Value_Count         := Value_Count + 1;
      Email_Address_Index := 1;

    -- Email address of sender.
    elsif Value_Count = 8 then
      if Email_Address_Index = 1 then
        Email_Address_Count := Email_Address_Count + 1;
      end if;
        Sender_Address(Email_Address_Index) := Char;
        Email_Address_Index := Email_Address_Index + 1;

    -- Email addresses of receivers.
    elsif Value_Count = 10 then
      if Email_Address_Index = 1 then
        Relationship_Count  := Relationship_Count + 1;
        Email_Address_Count := Email_Address_Count + 1;

        -- Add the sender to the relationship.
        if Sender_Address(1) = ' ' then
          Relationships(Relationship_Count).Sender(1 .. 7) := "unknown";
        else
          Relationships(Relationship_Count).Sender := Sender_Address;
        end if;
      end if;

      -- Multiple receivers.
      if Char = ',' then
        Email_Address_Index := 1;
      else
        -- Add the receiver to the relationship.
        Relationships(Relationship_Count).Receiver(Email_Address_Index) := Char;
        Email_Address_Index := Email_Address_Index + 1;
      end if;

    -- Email contains an attachment, not doing anything with this information.
    elsif Value_Count = 11 then
      Relationships(Relationship_Count).Strength := Attachment;
    end if;

    -- Keep the last character.
    Last_Char := Char;

    -- End of email.
    if Value_Count = 12 then
      Value_Count    := 1;
      Email_Count    := Email_Count + 1;
      Sender_Address := (others => ' ');
    end if;
  end loop;

  -- Display some stats.
  Ada.Text_IO.Put_Line("Emails analyzed: " & Natural\'Image(Email_Count));
  Ada.Text_IO.Put_Line("Email addresses found: " & Natural\'Image(Email_Address_Count));
  Ada.Text_IO.Put_Line("Relationships identified: " & Natural\'Image(Relationship_Count));

  -- Open DOT file.
  Ada.Text_IO.Create (File => DOT_File,
                      Mode => Ada.Text_IO.Out_File,
                      Name => Ada.Command_Line.Argument(2));

  -- Export relationships to DOT file format.
  Ada.Text_IO.Put_Line(DOT_File, "digraph G {");
  For I in Positive range 2 .. Relationship_Count loop
    Ada.Text_IO.Put(DOT_File, '"');
    -- Using character arrays and not strings, so this silly business.
    For C in 1 .. Relationships(I).Sender\'Length loop
      if Relationships(I).Sender(C) = ' ' then
        exit;
      else
        Ada.Text_IO.Put(DOT_File, Relationships(I).Sender(C));
      end if;
    end loop;
    Ada.Text_IO.Put(DOT_File, '"' & " -> " & '"');

    -- Using character arrays and not strings, so this silly business.
    For C in 1 .. Relationships(I).Receiver\'Length loop
      if Relationships(I).Receiver(C) = ' ' then
        exit;
      else
        Ada.Text_IO.Put(DOT_File, Relationships(I).Receiver(C));
      end if;
    end loop;
    Ada.Text_IO.Put_Line(DOT_File, '"' & ";");
  end loop;
  Ada.Text_IO.Put(DOT_File, "}");

  -- Close the DOT file.
  Ada.Text_IO.Close(DOT_File);

end Email_Relationship_Analysis;
```
